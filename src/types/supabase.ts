export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "13.0.5"
	}
	graphql_public: {
		Tables: {
			[_ in never]: never
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			graphql: {
				Args: {
					extensions?: Json
					operationName?: string
					query?: string
					variables?: Json
				}
				Returns: Json
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	public: {
		Tables: {
			BodyweightEntries: {
				Row: {
					bodyweight: number
					entry_date: string | null
					id: number
					user_id: number
				}
				Insert: {
					bodyweight: number
					entry_date?: string | null
					id?: number
					user_id: number
				}
				Update: {
					bodyweight?: number
					entry_date?: string | null
					id?: number
					user_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "BodyweightEntries_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "Users"
						referencedColumns: ["id"]
					},
				]
			}
			ExerciseEntries: {
				Row: {
					entry_date: string
					id: number
					kcal_burned: number
					user_id: number
				}
				Insert: {
					entry_date: string
					id?: number
					kcal_burned: number
					user_id: number
				}
				Update: {
					entry_date?: string
					id?: number
					kcal_burned?: number
					user_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "ExerciseEntries_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "Users"
						referencedColumns: ["id"]
					},
				]
			}
			FoodEntries: {
				Row: {
					entry_date: string
					food_id: number
					food_serving_id: number
					id: number
					serving_amount: number
					time_day: Database["public"]["Enums"]["TimeOfDay"]
					user_id: number
				}
				Insert: {
					entry_date: string
					food_id: number
					food_serving_id: number
					id?: number
					serving_amount: number
					time_day: Database["public"]["Enums"]["TimeOfDay"]
					user_id: number
				}
				Update: {
					entry_date?: string
					food_id?: number
					food_serving_id?: number
					id?: number
					serving_amount?: number
					time_day?: Database["public"]["Enums"]["TimeOfDay"]
					user_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "FoodEntries_food_id_fkey"
						columns: ["food_id"]
						isOneToOne: false
						referencedRelation: "Foods"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "FoodEntries_food_serving_id_fkey"
						columns: ["food_serving_id"]
						isOneToOne: false
						referencedRelation: "Servings"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "FoodEntries_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "Users"
						referencedColumns: ["id"]
					},
				]
			}
			FoodNutrients: {
				Row: {
					added_sugars: number
					calories: number
					carbohydrates: number
					cholesterol: number
					fat: number
					fiber: number
					food_id: number
					id: number
					monounsaturated_fat: number
					polyunsaturated_fat: number
					potassium: number
					protein: number
					saturated_fat: number
					sodium: number
					total_sugars: number
					trans_fat: number
				}
				Insert: {
					added_sugars: number
					calories: number
					carbohydrates: number
					cholesterol: number
					fat: number
					fiber: number
					food_id: number
					id?: number
					monounsaturated_fat: number
					polyunsaturated_fat: number
					potassium: number
					protein: number
					saturated_fat: number
					sodium: number
					total_sugars: number
					trans_fat: number
				}
				Update: {
					added_sugars?: number
					calories?: number
					carbohydrates?: number
					cholesterol?: number
					fat?: number
					fiber?: number
					food_id?: number
					id?: number
					monounsaturated_fat?: number
					polyunsaturated_fat?: number
					potassium?: number
					protein?: number
					saturated_fat?: number
					sodium?: number
					total_sugars?: number
					trans_fat?: number
				}
				Relationships: [
					{
						foreignKeyName: "FoodNutrients_food_id_fkey"
						columns: ["food_id"]
						isOneToOne: false
						referencedRelation: "Foods"
						referencedColumns: ["id"]
					},
				]
			}
			Foods: {
				Row: {
					barcode: string
					id: number
					name: string
				}
				Insert: {
					barcode: string
					id: number
					name: string
				}
				Update: {
					barcode?: string
					id?: number
					name?: string
				}
				Relationships: []
			}
			MealFoods: {
				Row: {
					food_id: number
					food_serving_id: number
					id: number
					meal_id: number
					seving_amount: number
				}
				Insert: {
					food_id: number
					food_serving_id: number
					id?: number
					meal_id: number
					seving_amount: number
				}
				Update: {
					food_id?: number
					food_serving_id?: number
					id?: number
					meal_id?: number
					seving_amount?: number
				}
				Relationships: [
					{
						foreignKeyName: "MealFoods_food_id_fkey"
						columns: ["food_id"]
						isOneToOne: false
						referencedRelation: "Foods"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "MealFoods_food_serving_id_fkey"
						columns: ["food_serving_id"]
						isOneToOne: false
						referencedRelation: "Servings"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "MealFoods_meal_id_fkey"
						columns: ["meal_id"]
						isOneToOne: false
						referencedRelation: "Meals"
						referencedColumns: ["id"]
					},
				]
			}
			Meals: {
				Row: {
					id: number
					name: string
					user_id: number
				}
				Insert: {
					id?: number
					name: string
					user_id: number
				}
				Update: {
					id?: number
					name?: string
					user_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "Meals_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "Users"
						referencedColumns: ["id"]
					},
				]
			}
			Servings: {
				Row: {
					food_id: number
					id: number
					is_grams: boolean
					serving_text: string
					serving_weight: number | null
				}
				Insert: {
					food_id: number
					id?: number
					is_grams?: boolean
					serving_text: string
					serving_weight?: number | null
				}
				Update: {
					food_id?: number
					id?: number
					is_grams?: boolean
					serving_text?: string
					serving_weight?: number | null
				}
				Relationships: [
					{
						foreignKeyName: "Servings_food_id_fkey1"
						columns: ["food_id"]
						isOneToOne: false
						referencedRelation: "Foods"
						referencedColumns: ["id"]
					},
				]
			}
			UserGoals: {
				Row: {
					bodyweight: number | null
					calories: number | null
					carbohydrates: number | null
					cholesterol: number | null
					fat: number | null
					fiber: number | null
					id: number
					potassium: number | null
					protein: number | null
					sodium: number | null
					user_id: number
				}
				Insert: {
					bodyweight?: number | null
					calories?: number | null
					carbohydrates?: number | null
					cholesterol?: number | null
					fat?: number | null
					fiber?: number | null
					id?: number
					potassium?: number | null
					protein?: number | null
					sodium?: number | null
					user_id: number
				}
				Update: {
					bodyweight?: number | null
					calories?: number | null
					carbohydrates?: number | null
					cholesterol?: number | null
					fat?: number | null
					fiber?: number | null
					id?: number
					potassium?: number | null
					protein?: number | null
					sodium?: number | null
					user_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "UserGoals_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: true
						referencedRelation: "Users"
						referencedColumns: ["id"]
					},
				]
			}
			Users: {
				Row: {
					created_at: string
					email: string
					id: number
					name: string | null
				}
				Insert: {
					created_at?: string
					email: string
					id?: number
					name?: string | null
				}
				Update: {
					created_at?: string
					email?: string
					id?: number
					name?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			TimeOfDay: "Breakfast" | "Lunch" | "Snacks" | "Dinner"
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
			DefaultSchema["Views"])
	? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
	? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
	: never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
	? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
	: never

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {
			TimeOfDay: ["Breakfast", "Lunch", "Snacks", "Dinner"],
		},
	},
} as const

export type TimeOfDay = Database["public"]["Enums"]["TimeOfDay"]
