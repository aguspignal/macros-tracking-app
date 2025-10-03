import { FoodEntry, OpenFoodFactsParsedProduct, OpenFoodFactsResponse } from "../types/foods"
import { isPostgrestError, notifyPostgrestError } from "../utils/helpers/queriesHelpers"
import { parseProductFromOFFResponse } from "../utils/helpers/foods"
import { useQuery } from "@tanstack/react-query"
import foodService from "../services/foodService"

const QUERYKEY_ROOT = "foods"
export const GETPRODUCTBYBARCODE_KEY = (bc: string) => [QUERYKEY_ROOT, "productByBarcode", bc]
export const GETFOODENTRIESBYUSERID_KEY = (uId: number) => [
	QUERYKEY_ROOT,
	"foodEntriesByUserId",
	uId,
]

export default function useFoodQuery() {
	function getProductByBarcode(barcode: string) {
		return useQuery<OpenFoodFactsParsedProduct | null>({
			queryKey: GETPRODUCTBYBARCODE_KEY(barcode),
			queryFn: async () => {
				if (!barcode) return null

				const result = await foodService.fetchFoodFromOFFByBarcode(barcode)

				if (isPostgrestError(result)) {
					notifyPostgrestError(result)
					return null
				}

				return parseProductFromOFFResponse(result as OpenFoodFactsResponse)
			},
		})
	}

	function getFoodEntriesByUserId({ userId, dateFrom, dateTo }: getFoodEntriesByUserIdParams) {
		return useQuery<FoodEntry[]>({
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

	return {
		getFoodEntriesByUserId,
		getProductByBarcode,
	}
}

type getFoodEntriesByUserIdParams = {
	userId: number | undefined
	dateFrom: string
	dateTo?: string
}
