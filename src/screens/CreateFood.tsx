import { CreateFoodForm } from "../types/forms"
import { Nutrients } from "../types/foods"
import { RootStackScreenProps } from "../types/navigation"
import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { useState } from "react"
import Button from "../components/buttons/Button"
import Input from "../components/inputs/Input"
import NutritionalInformationInputs from "../components/sections/NutritionalInformationInputs"
import useFoodMutation from "../hooks/useFoodMutation"
import * as yup from "yup"
import { CreateFoodSchema } from "../utils/validationSchemas"
import { useUserStore } from "../stores/userStore"

export default function CreateFood({ navigation }: RootStackScreenProps<"CreateFood">) {
	const { user } = useUserStore()
	const { createFoodServingNutrientsMutation } = useFoodMutation()
	const { mutate: createFood, isPending } = createFoodServingNutrientsMutation

	const [isLoading, setIsLoading] = useState(false)
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})
	const [form, setForm] = useState<CreateFoodForm>({
		name: "",
		servingText: "",
		servingWeight: "",
		isGrams: true,
		nutrients: {
			added_sugars: "",
			calories: "",
			carbohydrates: "",
			cholesterol: "",
			fat: "",
			fiber: "",
			monounsaturated_fat: "",
			polyunsaturated_fat: "",
			potassium: "",
			protein: "",
			saturated_fat: "",
			sodium: "",
			total_sugars: "",
			trans_fat: "",
		},
	})

	function updateField<T extends keyof CreateFoodForm>(key: T, value: CreateFoodForm[T]) {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	function updateNutrient(key: keyof Nutrients, value: string) {
		setForm((prev) => ({
			...prev,
			nutrients: { ...prev.nutrients, [key]: value },
		}))
	}

	async function handleCreateFood() {
		if (!user) return

		try {
			setFormErrors({})
			setIsLoading(true)
			const validatedData = await CreateFoodSchema.validate(form, {
				abortEarly: false,
			})

			const servingWeight = validatedData.servingWeight
				? parseFloat(validatedData.servingWeight)
				: null

			const nutrients: Nutrients = {
				data_per_serving: !!validatedData.servingWeight,
				calories: validatedData.nutrients.calories
					? parseFloat(validatedData.nutrients.calories)
					: 0,
				protein: validatedData.nutrients.protein
					? parseFloat(validatedData.nutrients.protein)
					: 0,
				fat: validatedData.nutrients.fat ? parseFloat(validatedData.nutrients.fat) : 0,
				saturated_fat: validatedData.nutrients.saturated_fat
					? parseFloat(validatedData.nutrients.saturated_fat)
					: 0,
				monounsaturated_fat: validatedData.nutrients.monounsaturated_fat
					? parseFloat(validatedData.nutrients.monounsaturated_fat)
					: 0,
				polyunsaturated_fat: validatedData.nutrients.polyunsaturated_fat
					? parseFloat(validatedData.nutrients.polyunsaturated_fat)
					: 0,
				trans_fat: validatedData.nutrients.trans_fat
					? parseFloat(validatedData.nutrients.trans_fat)
					: 0,
				carbohydrates: validatedData.nutrients.carbohydrates
					? parseFloat(validatedData.nutrients.carbohydrates)
					: 0,
				total_sugars: validatedData.nutrients.total_sugars
					? parseFloat(validatedData.nutrients.total_sugars)
					: 0,
				added_sugars: validatedData.nutrients.added_sugars
					? parseFloat(validatedData.nutrients.added_sugars)
					: 0,
				fiber: validatedData.nutrients.fiber
					? parseFloat(validatedData.nutrients.fiber)
					: 0,
				sodium: validatedData.nutrients.sodium
					? parseFloat(validatedData.nutrients.sodium)
					: 0,
				potassium: validatedData.nutrients.potassium
					? parseFloat(validatedData.nutrients.potassium)
					: 0,
				cholesterol: validatedData.nutrients.cholesterol
					? parseFloat(validatedData.nutrients.cholesterol)
					: 0,
			}

			createFood(
				{
					food: {
						name: validatedData.name,
						barcode: null,
						last_update: new Date().toISOString().split("T")[0],
						source: "user",
						user_id: user.id,
					},
					nutrients: nutrients,
					nutrientsDataPer: !servingWeight ? "serving" : "100g",
					serving: {
						food_id: -1,
						is_grams: validatedData.isGrams,
						serving_text: validatedData.servingText,
						serving_weight: servingWeight,
					},
				},
				{
					onSuccess: () => {
						navigation.navigate("SearchFood", { timeOfDay: undefined })
					},
				},
			)
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const newErrors: Record<string, string> = {}
				err.inner.forEach((e) => {
					if (e.path) newErrors[e.path] = e.message
				})
				setFormErrors(newErrors)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.inputsSection}>
				<Input
					value={form.name}
					setValue={(v) => updateField("name", v)}
					placeholder="Name"
					label="Food name"
					errorMessage={formErrors.name}
				/>
				<Input
					value={form.servingText}
					setValue={(v) => updateField("servingText", v)}
					label="Serving size"
					placeholder="e.g. 1 serving, 1/2 cup..."
					errorMessage={formErrors.servingText}
				/>
				<Input
					value={form.servingWeight}
					setValue={(v) => updateField("servingWeight", v)}
					label="Serving weight"
					placeholder={form.isGrams ? "g" : "ml"}
					labelAction={() => updateField("isGrams", !form.isGrams)}
					labelActionText="Swap units"
					labelActionIcon="swap-horizontal"
					errorMessage={formErrors.servingWeight}
				/>
			</View>

			<NutritionalInformationInputs
				nutrients={form.nutrients}
				onChange={updateNutrient}
				formErrors={formErrors}
			/>

			<Button
				title="Create food"
				onPress={handleCreateFood}
				isLoading={isPending || isLoading}
			/>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		gap: theme.spacing.l,
		paddingBottom: theme.spacing.xxl,
	},
	inputsSection: {
		gap: theme.spacing.xxs,
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xxs,
	},
	actionsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.s,
	},
})
