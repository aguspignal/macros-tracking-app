import { PostgrestError } from "@supabase/supabase-js"
import { FoodEntry, OpenFoodFactsResponse } from "../types/foods"
import { supabase } from "../lib/supabase"
import { OFF_API_URL } from "../resources/constants"

const foodService = {
	async fetchFoodFromOFFByBarcode(
		barcode: string,
	): Promise<OpenFoodFactsResponse | null | PostgrestError> {
		try {
			const response = await fetch(
				`${OFF_API_URL}/products/${barcode}?fields=code,brands,product_name,generic_name,nutrition_data_per,serving_quantity,serving_quantity_unit,serving_size,nutriments`,
			)

			if (!response.ok) return null

			const data = await response.json()
			console.log(data.product)
			return (data.product as OpenFoodFactsResponse) ?? null
		} catch (error) {
			console.log(error)
			return new PostgrestError({
				code: "error-fetching-product",
				details: "",
				hint: "",
				message: "No product found",
			})
		}
	},

	async fetchFoodEntriesByUserId({
		userId,
		dateFrom,
		dateTo,
	}: fetchFoodEntriesByUserIdParams): Promise<FoodEntry[] | PostgrestError> {
		console.log("F-SERVICE: fetchFoodEntriesByUserId")
		const { error, data } = await supabase
			.from("FoodEntries")
			.select(
				"serving_amount, time_day, entry_date, food:Foods(*, macros:FoodNutrients(calories, protein, fat, carbohydrates)), serving:Servings(*)",
			)
			.eq("user_id", userId)
			.gte("entry_date", dateFrom)
			.lte("entry_date", dateTo)

		if (error) return error

		const entries = data.map((entry) => {
			const { food, ...restEntry } = entry
			const { macros, ...restFood } = food

			return {
				macros: macros[0],
				food: restFood,
				...restEntry,
			}
		})

		return entries
	},
}

type fetchFoodEntriesByUserIdParams = {
	userId: number
	dateFrom: string
	dateTo: string
}

export default foodService
