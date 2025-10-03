import { DatabaseUser } from "../types/user"
import { isPostgrestError, notifyPostgrestError } from "../utils/helpers/queriesHelpers"
import { useQuery } from "@tanstack/react-query"
import userService from "../services/userService"
import foodService from "../services/foodService"
import { FoodEntry } from "../types/foods"

const QUERYKEY_ROOT = "user"
export const GETINITIALDATA_KEY = (uuid: string) => [QUERYKEY_ROOT, "getbyuuid", uuid]

export default function useUserQuery() {
	function getUserInitialData(uuid: string | undefined) {
		return useQuery<initialData>({
			queryKey: GETINITIALDATA_KEY(uuid ?? ""),
			queryFn: async () => {
				if (!uuid) return { user: null, todayFoodEntries: [] }
				const userResult = await userService.fetchUserByUuid(uuid)

				if (isPostgrestError(userResult)) {
					notifyPostgrestError(userResult)
					return { user: null, todayFoodEntries: [] }
				} else if (!userResult) {
					return { user: null, todayFoodEntries: [] }
				}

				const foodEntriesResult = await foodService.fetchFoodEntriesByUserId({
					userId: userResult.id,
					dateFrom: new Date().toISOString().split("T")[0],
					dateTo: new Date().toISOString().split("T")[0],
				})

				if (isPostgrestError(foodEntriesResult)) {
					notifyPostgrestError(foodEntriesResult)
				}

				return {
					user: userResult,
					todayFoodEntries: isPostgrestError(foodEntriesResult) ? [] : foodEntriesResult,
				}
			},
		})
	}

	return {
		getUserInitialData,
	}
}

type initialData = {
	user: DatabaseUser | null
	todayFoodEntries: FoodEntry[]
}
