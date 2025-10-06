import {
	DatabaseServing,
	Nutrients,
	OpenFoodFactsParsedProduct,
	OpenFoodFactsResponse,
} from "../../types/foods"
import { isStringValid, parseBrands } from "./parsing"
import { OFF_NUTRIMENTS_KEYS } from "../../resources/constants"

export function calculateNutrientPerServingAmount(
	amount: number | undefined,
	nutrientValue: number,
	isCustom: boolean,
): number {
	if (!amount) return nutrientValue
	return isCustom ? (nutrientValue * amount) / 100 : nutrientValue * amount
}

export function calculateNutrientsPerServing(
	nutrients: Nutrients,
	servingWeight: number,
): Nutrients {
	return {
		calories: (servingWeight * nutrients.calories) / 100,
		protein: (servingWeight * nutrients.protein) / 100,
		fat: (servingWeight * nutrients.fat) / 100,
		saturated_fat: (servingWeight * nutrients.saturated_fat) / 100,
		monounsaturated_fat: (servingWeight * nutrients.monounsaturated_fat) / 100,
		polyunsaturated_fat: (servingWeight * nutrients.polyunsaturated_fat) / 100,
		trans_fat: (servingWeight * nutrients.trans_fat) / 100,
		carbohydrates: (servingWeight * nutrients.carbohydrates) / 100,
		total_sugars: (servingWeight * nutrients.total_sugars) / 100,
		added_sugars: (servingWeight * nutrients.added_sugars) / 100,
		fiber: (servingWeight * nutrients.fiber) / 100,
		sodium: (servingWeight * nutrients.sodium) / 100,
		potassium: (servingWeight * nutrients.potassium) / 100,
		cholesterol: (servingWeight * nutrients.cholesterol) / 100,
		data_per_serving: true,
	}
}

export function parseProductFromOFFResponse(
	product: OpenFoodFactsResponse,
): OpenFoodFactsParsedProduct | null {
	const {
		code,
		product_name,
		brands,
		generic_name,
		serving_size,
		serving_quantity,
		serving_quantity_unit,
		nutrition_data_per,
		nutriments,
		last_modified,
	} = product

	if (!code || code.length <= 0) return null

	const name = parseProductName(product_name, generic_name, brands)
	if (!name) return null

	const serving = extractServing(
		serving_size,
		serving_quantity,
		serving_quantity_unit,
		nutrition_data_per,
	)

	// collect data per 100g if: no serving || serving and weight
	// collect data per serving if: serving but no weight || serving and weight but no data per 100g

	let nutrientsPer100g: Nutrients | null = null
	let nutrientsPerServing: Nutrients | null = null

	if (!serving || (serving && serving.serving_weight)) {
		nutrientsPer100g = extractNutrients(nutriments, "100g")
	}

	if (!serving && !nutrientsPer100g) return null

	if (
		(serving && !serving.serving_weight) ||
		(serving && serving.serving_weight && !nutrientsPer100g)
	) {
		nutrientsPerServing = extractNutrients(nutriments, "serving")
	}

	if (serving && !serving.serving_weight && !nutrientsPerServing) return null

	let nutrients = nutrientsPer100g ?? nutrientsPerServing
	if (!nutrients) return null

	return {
		id: -1,
		barcode: code,
		name,
		serving,
		nutrients,
		last_update: last_modified,
		source: "off",
		user_id: null,
		dataPer: nutrientsPer100g ? "100g" : "serving",
	}
}

function extractNutrients(
	nutriments: { [key: string]: unknown },
	extractPer: "100g" | "serving",
): Nutrients {
	let calories = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.calories, extractPer)
	const protein = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.protein, extractPer) ?? 0
	let fat = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.fat, extractPer)
	const saturated_fat =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.saturated_fat, extractPer) ?? 0
	const monounsaturated_fat =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.monounsaturated_fat, extractPer) ?? 0
	const polyunsaturated_fat =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.polyunsaturated_fat, extractPer) ?? 0
	const trans_fat = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.trans_fat, extractPer) ?? 0
	let carbohydrates = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.carbohydrates, extractPer)
	const total_sugars = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.total_sugars, extractPer) ?? 0
	const added_sugars = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.added_sugars, extractPer) ?? 0

	fat = fat ? fat : saturated_fat + monounsaturated_fat + polyunsaturated_fat + trans_fat
	carbohydrates = carbohydrates ? carbohydrates : total_sugars + added_sugars

	return {
		calories: calories ? calories : protein * 4 + fat * 9 + carbohydrates * 4,
		protein,
		fat,
		saturated_fat,
		monounsaturated_fat,
		polyunsaturated_fat,
		trans_fat,
		carbohydrates,
		total_sugars,
		added_sugars,
		fiber: getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.fiber, extractPer) ?? 0,
		sodium: getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.sodium, extractPer) ?? 0,
		potassium: getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.potassium, extractPer) ?? 0,
		cholesterol: getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.cholesterol, extractPer) ?? 0,
		data_per_serving: extractPer === "serving",
	}
}

function parseProductName(
	prodName: string | null | undefined,
	genericName: string | null | undefined,
	brands: string | null | undefined,
): string | null {
	const product = isStringValid(prodName) ? prodName?.trim() : null
	const generic = isStringValid(genericName) ? genericName?.trim() : null
	const brand = isStringValid(brands) ? brands?.trim() : null

	if (product) return brand ? `${product}, ${parseBrands(brand)}` : product
	if (generic) return brand ? `${generic}, ${parseBrands(brand)}` : generic
	if (brand) return brand
	return null
}

function extractServing(
	serving_size: string,
	serving_quantity: string | number,
	serving_quantity_unit: string,
	dataPer: string,
): DatabaseServing | null {
	const serving_text = isStringValid(serving_size) ? serving_size.trim() : null
	// : "100g"
	if (!serving_text) return null

	const serving_weight = isStringValid(serving_quantity) ? Number(serving_quantity) : null
	// : dataPer === "100g"
	// ? 100
	// : null

	const is_grams = isStringValid(serving_quantity_unit)
		? serving_quantity_unit === "g"
		: dataPer === "100g"

	return {
		id: -1,
		food_id: -1,
		serving_text,
		serving_weight,
		is_grams,
	}
}

function getNutrients(
	nutriments: {
		[key: string]: unknown
	},
	nutrientKey: string,
	extractPer: "100g" | "serving",
): number | null {
	const value = nutriments[`${nutrientKey}_${extractPer}`]

	if (typeof value === "number") return value
	return null
}
