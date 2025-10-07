import {
	FoodBasicMacros,
	FoodEntryMacros,
	FoodServingsNutrients,
	Nutrients,
	OpenFoodFactsParsedProduct,
	OpenFoodFactsResponse,
} from "../types/foods"
import { isOlderThanTwoWeeks } from "../utils/helpers/dates"
import { isPostgrestError, notifyPostgrestError } from "../utils/helpers/queriesHelpers"
import { parseProductFromOFFResponse } from "../utils/helpers/foods"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../stores/userStore"
import foodService from "../services/foodService"
import ToastNotification from "../components/notifications/ToastNotification"

const QUERYKEY_ROOT = "foods"
export const GETPRODUCTBYBARCODELAZY_KEY = (bc: string) => [QUERYKEY_ROOT, "productByBarcode", bc]
export const GETFOODENTRIESBYUSERID_KEY = (uId: number) => [
	QUERYKEY_ROOT,
	"foodEntriesByUserId",
	uId,
]
export const SEARCHFOODSBYNAMELAZY_KEY = (name: string) => [
	QUERYKEY_ROOT,
	"searchFoodsByName",
	name,
]
export const GETFOODSERVINGNUTRIENTSBYID_KEY = (fId: number) => [
	QUERYKEY_ROOT,
	"foodservingnutrients",
	fId,
]

export default function useFoodQuery() {
	const { user } = useUserStore()

	function getFoodServingNutrientsById(foodId: number | undefined) {
		return useQuery<FoodServingsNutrients | null>({
			queryKey: GETFOODSERVINGNUTRIENTSBYID_KEY(foodId ?? 0),
			queryFn: async () => {
				if (!foodId) return null

				const result = await foodService.fetchFoodServingNutrientsById(foodId)

				if (isPostgrestError(result)) {
					notifyPostgrestError(result)
					return null
				}

				if (!result?.nutrients) {
					ToastNotification({ title: "Error getting nutrients" })
				}

				return result
			},
		})
	}

	function getProductByBarcodeLazy(barcode: string | undefined) {
		return useQuery<
			| { product: FoodServingsNutrients; source: "db" }
			| { product: OpenFoodFactsParsedProduct; source: "off" }
			| null
		>({
			queryKey: GETPRODUCTBYBARCODELAZY_KEY(barcode ?? ""),
			queryFn: async () => {
				if (!barcode) return null

				const dbResult = await getProductFromDBByBarcode(barcode)
				if (dbResult) return dbResult

				const offResult = await getProductFromOFFByBarcode(barcode)
				return offResult
			},
			enabled: false,
			retry: 1,
		})
	}

	function getFoodEntriesByUserId({ userId, dateFrom, dateTo }: getFoodEntriesByUserIdParams) {
		return useQuery<FoodEntryMacros[]>({
			queryKey: GETFOODENTRIESBYUSERID_KEY(userId ?? 0),
			queryFn: async () => {
				if (!userId) return []

				const result = await foodService.fetchFoodEntriesByUserId({
					userId,
					dateFrom,
					dateTo: dateTo ?? dateFrom,
				})

				if (isPostgrestError(result)) {
					notifyPostgrestError(result)
					return []
				}

				return result
			},
		})
	}

	function searchFoodsByNameLazy(foodName: string) {
		return useQuery<FoodBasicMacros[]>({
			queryKey: SEARCHFOODSBYNAMELAZY_KEY(foodName),
			queryFn: async () => {
				if (!foodName) return []

				const result = await foodService.fetchFoodsByName({
					foodName,
					userId: user?.id ?? null,
				})

				if (isPostgrestError(result)) {
					console.log(result)
					notifyPostgrestError(result)
					return []
				}

				return result
			},
			enabled: false,
		})
	}

	return {
		getFoodServingNutrientsById,
		getFoodEntriesByUserId,
		getProductByBarcodeLazy,
		searchFoodsByNameLazy,
	}
}

type getFoodEntriesByUserIdParams = {
	userId: number | undefined
	dateFrom: string
	dateTo?: string
}

async function getProductFromOFFByBarcode(
	barcode: string,
): Promise<{ product: OpenFoodFactsParsedProduct; source: "off" } | null> {
	const offResult = await foodService.fetchFoodFromOFFByBarcode(barcode)

	if (isPostgrestError(offResult)) {
		notifyPostgrestError(offResult)
		return null
	}

	const parsed = parseProductFromOFFResponse(offResult as OpenFoodFactsResponse)
	if (!parsed) return null

	return {
		product: parsed,
		source: "off",
	}
}

async function getProductFromDBByBarcode(
	barcode: string,
): Promise<{ product: FoodServingsNutrients; source: "db" } | null> {
	const dbResult = await foodService.fetchFoodServingNutrientsByBarcode(barcode)

	if (isPostgrestError(dbResult)) {
		notifyPostgrestError(dbResult)
		return null
	}

	if (!dbResult) return null

	if (dbResult.food.source === "off" && isOlderThanTwoWeeks(dbResult.food.last_update)) {
		const refreshResult = await refreshOFFData(dbResult, barcode)

		if (refreshResult)
			return {
				product: {
					food: refreshResult.food,
					nutrients: refreshResult.nutrients,
					servings: refreshResult.servings,
				},
				source: "db",
			}
	}

	return {
		product: dbResult,
		source: "db",
	}
}

async function refreshOFFData(dbResult: FoodServingsNutrients, barcode: string) {
	const offResponse = await foodService.fetchFoodFromOFFByBarcode(barcode)

	const parsed = offResponse
		? parseProductFromOFFResponse(offResponse as OpenFoodFactsResponse)
		: null
	if (!parsed) return null

	const updatedFood = await updateFood(dbResult.food.id, parsed)
	const updatedServing = parsed.serving
		? await updateServing(
				dbResult.servings[0].id,
				parsed.serving.serving_text,
				parsed.serving.serving_weight,
				parsed.serving.is_grams,
		  )
		: dbResult.servings
	const updatedNutrients = await updateNutrients(dbResult.food.id, parsed.nutrients)

	return {
		food: updatedFood ?? dbResult.food,
		servings: updatedServing ?? dbResult.servings,
		nutrients: updatedNutrients ?? dbResult.nutrients,
	}
}

async function updateFood(foodId: number, parsed: OpenFoodFactsParsedProduct) {
	const result = await foodService.updateFood({
		foodId,
		barcode: parsed.barcode,
		name: parsed.name,
		last_update: new Date().toISOString().split("T")[0],
	})
	return isPostgrestError(result) ? null : result
}

async function updateServing(
	servingId: number,
	servingText: string,
	servingWeight: number | null,
	isGrams: boolean,
) {
	const result = await foodService.updateServing({
		servingId,
		serving_text: servingText,
		serving_weight: servingWeight,
		is_grams: isGrams,
	})
	return isPostgrestError(result) ? null : [result]
}

async function updateNutrients(foodId: number, nutrients: Nutrients) {
	const result = await foodService.updateNutrients({ foodId, nutrients })
	return isPostgrestError(result) ? null : result
}
