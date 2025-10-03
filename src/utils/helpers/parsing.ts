import { BasicMacros } from "../../types/foods"

export function parseBasicMacrosForServingSize(
	macros100: BasicMacros,
	servingAmount: number,
	servingWeight: number | null,
): BasicMacros {
	const { calories, carbohydrates, fat, protein } = macros100

	const caloriesPerServing = servingWeight ? (calories * servingWeight) / 100 : calories
	const proteinPerServing = servingWeight ? (protein * servingWeight) / 100 : protein
	const fatPerServing = servingWeight ? (fat * servingWeight) / 100 : fat
	const carsPerServing = servingWeight ? (carbohydrates * servingWeight) / 100 : carbohydrates

	return {
		calories: caloriesPerServing * servingAmount,
		protein: proteinPerServing * servingAmount,
		fat: fatPerServing * servingAmount,
		carbohydrates: carsPerServing * servingAmount,
	}
}

export function isStringValid(str: string | number | undefined | null): boolean {
	if (str === undefined || str === null) return false

	if (typeof str === "number") return str > 0

	const trimmed = str.trim()
	return trimmed.length > 0 && trimmed !== "N/A" && Number(trimmed) !== 0
}

export function parseBrands(brand: string): string {
	return brand.replace(/,(?=\S)/g, ", ").replace(/, +/g, ", ")
}
