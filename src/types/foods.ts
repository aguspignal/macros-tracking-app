import { Database } from "./supabase"

export type DatabaseFood = Database["public"]["Tables"]["Foods"]["Row"]
export type DatabaseFoodNutrients = Database["public"]["Tables"]["FoodNutrients"]["Row"]
export type DatabaseServing = Database["public"]["Tables"]["Servings"]["Row"]
export type DatabaseInsertServing = Database["public"]["Tables"]["Servings"]["Insert"]

export type DatabaseFoodEntry = Database["public"]["Tables"]["FoodEntries"]["Row"]
export type DatabaseBodyweightEntry = Database["public"]["Tables"]["BodyweightEntries"]["Row"]
export type DatabaseExerciseEntry = Database["public"]["Tables"]["ExerciseEntries"]["Row"]

export type DatabaseMeal = Database["public"]["Tables"]["Meals"]["Row"]
export type DatabaseMealFood = Database["public"]["Tables"]["MealFoods"]["Row"]

export type TimeOfDay = Database["public"]["Enums"]["TimeOfDay"]
export type FoodSource = Database["public"]["Enums"]["FoodSource"]

export type Nutrients = Omit<DatabaseFoodNutrients, "id" | "food_id">
export type BasicMacros = Pick<Nutrients, "calories" | "protein" | "fat" | "carbohydrates">

export type FoodAndServings = {
	food: DatabaseFood
	servings: DatabaseServing[]
}

export type FoodEntry = FoodAndServings & {
	macros: BasicMacros
} & Pick<DatabaseFoodEntry, "serving_amount" | "time_day" | "entry_date">

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
	id: number
	barcode: string
	name: string
	nutrients: Nutrients
	last_update: string
	source: FoodSource
	user_id: number | null
	serving: DatabaseServing | null
}

export type FoodServingsNutrients = {
	food: DatabaseFood
	servings: DatabaseServing[]
	nutrients: DatabaseFoodNutrients
}
