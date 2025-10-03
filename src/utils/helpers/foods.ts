import {
	DatabaseServing,
	Nutrients,
	OpenFoodFactsParsedProduct,
	OpenFoodFactsResponse,
} from "../../types/foods"
import { isStringValid, parseBrands } from "./parsing"
import { OFF_NUTRIMENTS_KEYS } from "../../resources/constants"

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
	const needDataPer = !serving ? "100g" : serving.serving_weight ? "100g" : "serving"

	const nutrients = extractNutrimentsFromOFFResponse(
		nutriments,
		!!serving,
		!!serving?.serving_weight,
	)

	if (!nutrients) return null

	return {
		barcode: code,
		name,
		nutrients,
		serving,
	}
}

export function extractNutrimentsFromOFFResponse(
	nutriments: {
		[key: string]: unknown
	},
	thereIsServing: boolean,
	thereIsWeight: boolean,
): Nutrients | null {
	const calories = getNutrients(
		nutriments,
		OFF_NUTRIMENTS_KEYS.calories,
		thereIsServing,
		thereIsWeight,
	)

	const protein =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.protein, thereIsServing, thereIsWeight) ?? 0
	const carbohydrates =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.calories, thereIsServing, thereIsWeight) ?? 0
	const saturated_fat =
		getNutrients(
			nutriments,
			OFF_NUTRIMENTS_KEYS.saturated_fat,
			thereIsServing,
			thereIsWeight,
		) ?? 0
	const monounsaturated_fat =
		getNutrients(
			nutriments,
			OFF_NUTRIMENTS_KEYS.monounsaturated_fat,
			thereIsServing,
			thereIsWeight,
		) ?? 0
	const polyunsaturated_fat =
		getNutrients(
			nutriments,
			OFF_NUTRIMENTS_KEYS.polyunsaturated_fat,
			thereIsServing,
			thereIsWeight,
		) ?? 0
	const trans_fat =
		getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.trans_fat, thereIsServing, thereIsWeight) ?? 0

	let fat = getNutrients(nutriments, OFF_NUTRIMENTS_KEYS.fat, thereIsServing, thereIsWeight)
	fat = fat ? fat : saturated_fat + monounsaturated_fat + polyunsaturated_fat + trans_fat

	return {
		calories: calories ? calories : protein * 4 + fat * 9 + carbohydrates * 4,
		protein: protein,
		fat,
		saturated_fat,
		polyunsaturated_fat,
		monounsaturated_fat,
		trans_fat,
		carbohydrates: carbohydrates,
		total_sugars:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.total_sugars,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
		added_sugars:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.added_sugars,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
		fiber:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.fiber,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
		sodium:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.sodium,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
		potassium:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.potassium,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
		cholesterol:
			getNutrients(
				nutriments,
				OFF_NUTRIMENTS_KEYS.cholesterol,

				thereIsServing,
				thereIsWeight,
			) ?? 0,
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
	// : dataPer === "100g"
	// ? "100g"
	// : dataPer === "100ml"
	// ? "100ml"
	// : "100g"
	if (!serving_text) return null

	const serving_weight = isStringValid(serving_quantity) ? Number(serving_quantity) : null
	// : dataPer === "100g" || dataPer === "100ml"
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
	thereIsServing: boolean,
	thereIsWeight: boolean,
	// ): { value: number; dataPer: "100g" | "serving" } | null {
): number | null {
	var value
	if (!thereIsServing) {
		value = nutriments[`${nutrientKey}_100g`]
		if (typeof value === "number") return value

		return null
	}

	if (!thereIsWeight) {
		value = nutriments[`${nutrientKey}_serving`]
		if (typeof value === "number") return value

		return null
	}

	value = nutriments[`${nutrientKey}_100g`]
	if (typeof value === "number") return value

	value = nutriments[`${nutrientKey}_serving`]
	if (typeof value === "number") return value

	return null
}

// function getNutrients(
// 	nutriments: {
// 		[key: string]: unknown
// 	},
// 	nutrientKey: string,
// 	dataPer: string,
// ): number | null {
// 	if (dataPer === "100g") {
// 		return (nutriments[`${nutrientKey}_100g`] as number) ?? null
// 	}
// 	if (dataPer === "serving") {
// 		return (nutriments[`${nutrientKey}_serving`] as number) ?? null
// 	}
// 	return null
// }
