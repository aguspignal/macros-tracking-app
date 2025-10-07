import { NutrientsString } from "./foods"

export type SignInFormValues = {
	email: string
	password: string
}

export type SignUpFormValues = {
	email: string
	password: string
	confirmPassword: string
}

export type NutrientsValues = {
	calories: number
	protein: number
	fat: number
	saturated_fat?: number
	monounsaturated_fat?: number
	polyunsaturated_fat?: number
	trans_fat?: number
	carbs: number
	total_sugars?: number
	added_sugars?: number
	fiber?: number
	sodium?: number
	potassium?: number
	cholesterol?: number
}

export type CreateFoodForm = {
	name: string
	servingText: string
	servingWeight: string
	isGrams: boolean
	nutrients: NutrientsString
}
