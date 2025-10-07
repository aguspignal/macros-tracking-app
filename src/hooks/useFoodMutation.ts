import { FoodSource, Nutrients, TimeOfDay } from "../types/foods"
import { isPostgrestError, notifyIfRequestError } from "../utils/helpers/queriesHelpers"
import { useMutation } from "@tanstack/react-query"
import foodService from "../services/foodService"
import ToastNotification from "../components/notifications/ToastNotification"

export default function useFoodMutation() {
	const createFoodServingNutrientsMutation = useMutation({
		mutationFn: async ({
			food,
			nutrients,
			serving,
			nutrientsDataPer,
		}: createFoodServingNutrientsParams) => {
			const foodResult = await foodService.postFood({ ...food })

			if (isPostgrestError(foodResult)) {
				notifyIfRequestError(foodResult)
				return null
			}

			const nutrientsResult = await foodService.postNutrients({
				food_id: foodResult.id,
				nutrients,
				dataPer: nutrientsDataPer,
			})

			if (isPostgrestError(nutrientsResult)) {
				notifyIfRequestError(nutrientsResult)
				return null
			}

			if (!serving)
				return {
					food: foodResult,
					nutrients: nutrientsResult,
					serving: null,
				}

			const servingResult = await foodService.postServing({
				...serving,
				food_id: foodResult.id,
			})

			if (isPostgrestError(servingResult)) {
				notifyIfRequestError(servingResult)
				return {
					food: foodResult,
					nutrients: nutrientsResult,
					serving: null,
				}
			}

			return {
				food: foodResult,
				nutrients: nutrientsResult,
				serving: servingResult,
			}
		},
		onError: handleOnError,
	})

	const createFoodEntryMutation = useMutation({
		mutationFn: async ({ user_id, serving_id, ...params }: createFoodEntryParams) => {
			console.log("1")
			if (!user_id) return null

			console.log("2")
			const entry = await foodService.postFoodEntry({
				user_id,
				serving_id: serving_id ?? null,
				...params,
			})

			console.log("entry: ", entry)
			if (isPostgrestError(entry)) {
				notifyIfRequestError(entry)
				return null
			}

			return entry
		},
		onError: handleOnError,
	})

	const updateFoodEntryMutation = useMutation({
		mutationFn: async ({ entryId, servingId, servingAmount }: updateFoodEntryParams) => {
			const entry = await foodService.updateFoodEntry({
				entryId,
				servingId: servingId ?? null,
				servingAmount,
			})

			if (isPostgrestError(entry)) {
				notifyIfRequestError(entry)
				return null
			}

			return entry
		},
		onError: handleOnError,
	})

	const deleteFoodEntryMutation = useMutation({
		mutationFn: async ({ entryId }: deleteFoodEntryParams) => {
			const result = await foodService.deleteFoodEntryById(entryId)

			if (isPostgrestError(result)) {
				notifyIfRequestError(result)
				return null
			}

			return result
		},
		onError: handleOnError,
	})

	return {
		createFoodServingNutrientsMutation,
		createFoodEntryMutation,
		updateFoodEntryMutation,
		deleteFoodEntryMutation,
	}
}

type createFoodServingNutrientsParams = {
	food: {
		name: string
		barcode: string | null
		last_update: string
		source: FoodSource
		user_id: number | null
	}
	serving: {
		food_id: number
		serving_text: string
		serving_weight: number | null
		is_grams: boolean
	} | null
	nutrients: Nutrients
	nutrientsDataPer: "100g" | "serving"
}

type createFoodEntryParams = {
	user_id: number | undefined
	food_id: number
	serving_id: number | undefined
	serving_amount: number
	timeOfDay: TimeOfDay
	date: string
}

type updateFoodEntryParams = {
	entryId: number
	servingId?: number | null
	servingAmount: number
}

type deleteFoodEntryParams = {
	entryId: number
}

function handleOnError(error: Error) {
	console.log(error)
	ToastNotification({ title: "Ups, there was an error. Please try again" })
}
