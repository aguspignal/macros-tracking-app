import { Database } from "./supabase"

export type DatabaseFood = Database["public"]["Tables"]["Foods"]["Row"]
export type DatabaseFoodNutrient = Database["public"]["Tables"]["FoodNutrients"]["Row"]
export type DatabaseServing = Database["public"]["Tables"]["Servings"]["Row"]

export type DatabaseFoodEntry = Database["public"]["Tables"]["FoodEntries"]["Row"]
export type DatabaseBodyweightEntry = Database["public"]["Tables"]["BodyweightEntries"]["Row"]
export type DatabaseExerciseEntry = Database["public"]["Tables"]["ExerciseEntries"]["Row"]

export type DatabaseMeal = Database["public"]["Tables"]["Meals"]["Row"]
export type DatabaseMealFood = Database["public"]["Tables"]["MealFoods"]["Row"]

export type FoodAndServing = {
	foood: DatabaseFood
	serving: DatabaseServing
}

export type Nutrients = Omit<DatabaseFoodNutrient, "id" | "food_id">
export type BasicMacros = Pick<Nutrients, "calories" | "protein" | "fat" | "carbohydrates">
