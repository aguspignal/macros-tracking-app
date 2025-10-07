import {
	DatabaseFood,
	DatabaseFoodEntry,
	DatabaseFoodNutrients,
	DatabaseServing,
	FoodBasicMacros,
	FoodEntryMacros,
	FoodServingsNutrients,
	FoodSource,
	Nutrients,
	OpenFoodFactsResponse,
	TimeOfDay,
} from "../types/foods"
import { OFF_API_URL } from "../resources/constants"
import { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "../lib/supabase"
import ToastNotification from "../components/notifications/ToastNotification"

const foodService = {
	async fetchFoodServingNutrientsById(
		foodId: number,
	): Promise<FoodServingsNutrients | null | PostgrestError> {
		console.log("F-SERVICE: fetchFoodServingNutrientsById")
		const { error, data } = await supabase
			.from("Foods")
			.select("*, servings:Servings(*), nutrients:FoodNutrients(*)")
			.eq("id", foodId)

		if (error) return error
		if (data.length === 0) return null
		const { servings, nutrients, ...food } = data[0]

		return {
			food,
			servings,
			nutrients,
		}
	},

	async fetchFoodServingNutrientsByBarcode(
		barcode: string,
	): Promise<FoodServingsNutrients | null | PostgrestError> {
		console.log("F-SERVICE: fetchFoodServingNutrientsByBarcode")
		const { error, data } = await supabase
			.from("Foods")
			.select("*, servings:Servings(*), nutrients:FoodNutrients(*)")
			.eq("barcode", barcode)

		if (error) return error
		if (data.length === 0) return null
		const { servings, nutrients, ...food } = data[0]

		return {
			food,
			servings,
			nutrients,
		}
	},

	async fetchFoodFromOFFByBarcode(
		barcode: string,
	): Promise<OpenFoodFactsResponse | null | PostgrestError> {
		console.log("F-SERVICE: fetchFoodFromOFFByBarcode")
		try {
			const response = await fetch(
				`${OFF_API_URL}/products/${barcode}?fields=code,brands,product_name,generic_name,nutrition_data_per,serving_quantity,serving_quantity_unit,serving_size,last_modified_t,nutriments`,
			)

			if (!response.ok) return null

			const data = await response.json()
			return (data.product as OpenFoodFactsResponse) ?? null
		} catch (error) {
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
	}: fetchFoodEntriesByUserIdParams): Promise<FoodEntryMacros[] | PostgrestError> {
		console.log("F-SERVICE: fetchFoodEntriesByUserId")
		const { error, data } = await supabase
			.from("FoodEntries")
			.select(
				"*, food:Foods(name, macros:FoodNutrients(calories, protein, fat, carbohydrates)), serving:Servings(serving_text)",
			)
			.eq("user_id", userId)
			.gte("entry_date", dateFrom)
			.lte("entry_date", dateTo)

		if (error) return error

		return data.map((row) => {
			const { food, serving, ...entry } = row
			const { name, macros } = food

			return {
				entry,
				foodName: name,
				servingText: serving?.serving_text ?? null,
				macros: macros,
			}
		})

		// return entries
	},

	async fetchFoodsByName({
		foodName,
		userId,
	}: fetchFoodsByNameParams): Promise<FoodBasicMacros[] | PostgrestError> {
		console.log("F-SERVICE: fetchFoodsByName")
		const { error: error1, data: data1 } = await supabase
			.from("Foods")
			.select("*, macros:FoodNutrients(calories,protein,fat,carbohydrates)")
			.in("source", ["off", "usda"])
			.ilike("name", `%${foodName}%`)
			.limit(20)

		if (error1) return error1

		let userFoods: FoodBasicMacros[] = []
		if (userId) {
			const { error: error2, data: data2 } = await supabase
				.from("Foods")
				.select("*, macros:FoodNutrients(calories,protein,fat,carbohydrates)")
				.eq("user_id", userId)
				.ilike("name", `%${foodName}%`)
				.limit(20)

			if (error2) {
				ToastNotification({ title: "Error getting user foods" })
			}

			if (data2) {
				for (const row of data2) {
					const { macros, ...food } = row
					if (!macros) continue
					userFoods.push({ food, macros })
				}
			}
		}

		let allFoods = []
		for (const row of data1) {
			const { macros, ...food } = row
			if (!macros) continue
			allFoods.push({ food, macros })
		}

		return allFoods.concat(userFoods)
	},

	async postFood({
		name,
		barcode,
		last_update,
		source,
		user_id,
	}: postFoodParams): Promise<DatabaseFood | PostgrestError> {
		console.log("F-SERVICE: postFood")
		const { error, data } = await supabase
			.from("Foods")
			.insert({ name, barcode, source, last_update, user_id })
			.select()

		if (error) return error
		return data[0]
	},

	async postNutrients({
		food_id,
		nutrients,
		dataPer,
	}: postNutrientsParams): Promise<DatabaseFoodNutrients | PostgrestError> {
		console.log("F-SERVICE: postNutrients")
		const { error, data } = await supabase
			.from("FoodNutrients")
			.insert({ food_id, ...nutrients, data_per_serving: dataPer === "serving" })
			.select()

		if (error) return error
		return data[0]
	},

	async postServing({
		food_id,
		serving_text,
		serving_weight,
		is_grams,
	}: postServingParams): Promise<DatabaseServing | PostgrestError> {
		console.log("F-SERVICE: postServing")
		const { error, data } = await supabase
			.from("Servings")
			.insert({ food_id, serving_text, serving_weight, is_grams })
			.select()

		if (error) return error
		return data[0]
	},

	async postFoodEntry({
		user_id,
		food_id,
		serving_id,
		serving_amount,
		timeOfDay,
		date,
	}: postFoodEntryParams): Promise<DatabaseFoodEntry | PostgrestError> {
		console.log("F-SERVICE: postFoodEntry")
		const { error, data } = await supabase
			.from("FoodEntries")
			.insert({
				user_id,
				food_id,
				serving_id,
				serving_amount,
				time_day: timeOfDay,
				entry_date: date,
			})
			.select()

		if (error) return error
		return data[0]
	},

	async updateFood({
		foodId,
		barcode,
		last_update,
		name,
	}: updateFoodParams): Promise<DatabaseFood | PostgrestError> {
		console.log("F-SERVICE: updateFood")
		const { error, data } = await supabase
			.from("Foods")
			.update({ barcode, name, last_update })
			.eq("id", foodId)
			.select()

		if (error) return error
		return data[0]
	},

	async updateServing({
		servingId,
		serving_text,
		serving_weight,
		is_grams,
	}: updateServingParams): Promise<DatabaseServing | PostgrestError> {
		console.log("F-SERVICE: updateServing")
		const { error, data } = await supabase
			.from("Servings")
			.update({ serving_text, serving_weight, is_grams })
			.eq("id", servingId)
			.select()

		if (error) return error
		return data[0]
	},

	async updateNutrients({
		foodId,
		nutrients,
	}: updateNutrientsParams): Promise<DatabaseFoodNutrients | PostgrestError> {
		console.log("F-SERVICE: updateNutrients")
		const { error, data } = await supabase
			.from("FoodNutrients")
			.update({ ...nutrients })
			.eq("food_id", foodId)
			.select()

		if (error) return error
		return data[0]
	},

	async updateFoodEntry({
		entryId,
		servingAmount,
		servingId,
	}: updateFoodEntryParams): Promise<DatabaseFoodEntry | PostgrestError> {
		console.log("F-SERVICE: updateFoodEntry")
		const { error, data } = await supabase
			.from("FoodEntries")
			.update({ serving_id: servingId, serving_amount: servingAmount })
			.eq("id", entryId)
			.select()

		if (error) return error
		return data[0]
	},

	async deleteFoodEntryById(entryId: number): Promise<number | PostgrestError> {
		console.log("F-SERVICE: deleteFoodEntryById")
		const { error, count } = await supabase
			.from("FoodEntries")
			.delete({ count: "exact" })
			.eq("id", entryId)

		if (error) return error
		return count ?? 0
	},
}

type fetchFoodEntriesByUserIdParams = {
	userId: number
	dateFrom: string
	dateTo: string
}

type fetchFoodsByNameParams = {
	foodName: string
	userId: number | null
}

type postFoodParams = {
	name: string
	barcode: string | null
	last_update: string
	source: FoodSource
	user_id: number | null
}

type postNutrientsParams = {
	food_id: number
	nutrients: Nutrients
	dataPer: "100g" | "serving"
}

type postServingParams = {
	food_id: number
	serving_text: string
	serving_weight: number | null
	is_grams: boolean
}

type postFoodEntryParams = {
	user_id: number
	food_id: number
	serving_id: number | null
	serving_amount: number
	timeOfDay: TimeOfDay
	date: string
}

type updateFoodEntryParams = {
	entryId: number
	servingId: number | null
	servingAmount: number
}

type updateFoodParams = {
	foodId: number
	name: string
	barcode: string | null
	last_update: string
}

type updateServingParams = {
	servingId: number
	serving_text: string
	serving_weight: number | null
	is_grams: boolean
}

type updateNutrientsParams = {
	foodId: number
	nutrients: Nutrients
}

export default foodService
