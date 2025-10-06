import {
	FoodBasicMacros,
	FoodEntryMacros,
	FoodServingsNutrients,
	OpenFoodFactsParsedProduct,
	OpenFoodFactsResponse,
} from "../types/foods"
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

				const dbResult = await foodService.fetchFoodServingNutrientsByBarcode(barcode)

				if (isPostgrestError(dbResult)) {
					notifyPostgrestError(dbResult)
					return null
				}

				if (dbResult)
					return {
						product: dbResult,
						source: "db",
					}

				const result = await foodService.fetchFoodFromOFFByBarcode(barcode)

				if (isPostgrestError(result)) {
					notifyPostgrestError(result)
					return null
				}

				const parsedProduct = parseProductFromOFFResponse(result as OpenFoodFactsResponse)
				if (!parsedProduct) return null

				return {
					product: parsedProduct,
					source: "off",
				}
			},
			enabled: false,
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
