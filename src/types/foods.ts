import { Database } from "./supabase"

export type DatabaseFood = Database["public"]["Tables"]["Foods"]["Row"]
export type DatabaseFoodNutrient = Database["public"]["Tables"]["FoodNutrients"]["Row"]
export type DatabaseServing = Database["public"]["Tables"]["Servings"]["Row"]
export type DatabaseInsertServing = Database["public"]["Tables"]["Servings"]["Insert"]

export type DatabaseFoodEntry = Database["public"]["Tables"]["FoodEntries"]["Row"]
export type DatabaseBodyweightEntry = Database["public"]["Tables"]["BodyweightEntries"]["Row"]
export type DatabaseExerciseEntry = Database["public"]["Tables"]["ExerciseEntries"]["Row"]

export type DatabaseMeal = Database["public"]["Tables"]["Meals"]["Row"]
export type DatabaseMealFood = Database["public"]["Tables"]["MealFoods"]["Row"]

export type TimeOfDay = Database["public"]["Enums"]["TimeOfDay"]

export type Nutrients = Omit<DatabaseFoodNutrient, "id" | "food_id">
export type BasicMacros = Pick<Nutrients, "calories" | "protein" | "fat" | "carbohydrates">

export type FoodAndServing = {
	food: DatabaseFood
	serving: DatabaseServing
}

export type FoodEntry = FoodAndServing & {
	macros: BasicMacros
} & Pick<DatabaseFoodEntry, "serving_amount" | "time_day" | "entry_date">

export type FoodServingNutrients = FoodAndServing & {
	nutrients: Nutrients
}

export type OpenFoodFactsResponse = {
	code: string
	brands: string
	product_name: string
	generic_name: string
	nutrition_data_per: string
	serving_quantity: string | number
	serving_quantity_unit: string
	serving_size: string
	nutriments: {
		[key: string]: unknown
	}
}

export type OpenFoodFactsParsedProduct = {
	barcode: string
	name: string
	nutrients: Nutrients
	serving: DatabaseServing | null
}
