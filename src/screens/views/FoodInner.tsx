import {
	calculateNutrientPerServingAmount,
	calculateNutrientsPerServing,
} from "../../utils/helpers/foods"
import { BasicMacros, DatabaseServing, Nutrients } from "../../types/foods"
import { inputStyles } from "../../resources/styles/inputStyles"
import { ScrollView } from "react-native-gesture-handler"
import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import { useEffect, useState } from "react"
import Button from "../../components/buttons/Button"
import DropdownMenu from "../../components/dropdowns/DropdownMenu"
import Input from "../../components/inputs/Input"
import MacrosSummaryCard from "../../components/cards/MacrosSummaryCard"
import MCIcon from "../../components/icons/MCIcon"
import NutritionalInformation from "../../components/cards/NutritionalInformation"
import StyledText from "../../components/texts/StyledText"
import ToastNotification from "../../components/notifications/ToastNotification"
import ConfirmationModal from "../../components/modals/ConfirmationModal"

type FoodInnerProps = {
	isEditView: boolean
	foodName: string
	barcode: string | null
	servings: DatabaseServing[]
	nutrients: Nutrients
	initialServingData?: { servingId: number | null; amount: number }
	isLoadingAction?: boolean
	onAction: (servingAmount: number, macros: BasicMacros, servingId?: number) => void
	onDelete?: () => void
}

export default function FoodInner({
	isEditView,
	foodName,
	nutrients,
	servings,
	barcode,
	initialServingData,
	isLoadingAction = false,
	onAction,
	onDelete = () => {},
}: FoodInnerProps) {
	const initialServing = initialServingData
		? servings.find((s) => s.id === initialServingData.servingId)
		: undefined

	const [confirmationModalVisible, setConfirmationModalVisible] = useState(false)
	const [servingAmount, setServingAmount] = useState<string | undefined>(
		initialServingData ? initialServingData?.amount.toString() : undefined,
	)
	const [selectedServing, setSelectedServing] = useState<DatabaseServing | "Custom">(
		initialServing
			? initialServing
			: servings.length > 0
			? servings[0].serving_text === "100 g"
				? "Custom"
				: servings[0]
			: "Custom",
	)
	const [nutrientsPerServing, setNutrientsPerServing] = useState<Nutrients>(nutrients)

	function handleSelectServing(servingId: number, isCustom: boolean) {
		if (isCustom) {
			setSelectedServing("Custom")
			return
		}

		const selectedServing = servings.find((s) => s.id === servingId) ?? "Custom"
		setSelectedServing(selectedServing)
	}

	function handleAction() {
		if (!servingAmount) {
			ToastNotification({ title: "Serving amount can't be empty" })
			return
		}

		const servingId = selectedServing !== "Custom" ? selectedServing?.id : undefined
		const macros: BasicMacros = {
			calories: calculateNutrientPerServingAmount(
				parseFloat(servingAmount),
				nutrientsPerServing.calories,
				selectedServing === "Custom",
			),
			protein: calculateNutrientPerServingAmount(
				parseFloat(servingAmount),
				nutrientsPerServing.protein,
				selectedServing === "Custom",
			),
			fat: calculateNutrientPerServingAmount(
				parseFloat(servingAmount),
				nutrientsPerServing.fat,
				selectedServing === "Custom",
			),
			carbohydrates: calculateNutrientPerServingAmount(
				parseFloat(servingAmount),
				nutrientsPerServing.carbohydrates,
				selectedServing === "Custom",
			),
		}
		onAction(parseFloat(servingAmount), macros, servingId)
	}

	function handleDeleteEntry() {
		setConfirmationModalVisible(false)
		onDelete()
	}

	useEffect(() => {
		if (nutrients.data_per_serving) {
			setNutrientsPerServing(nutrients)
			return
		}

		if (selectedServing === "Custom") {
			const calculatedNutrients = calculateNutrientsPerServing(nutrients, 100)
			setNutrientsPerServing(calculatedNutrients)
			return
		}

		if (selectedServing?.serving_weight) {
			const calculatedNutrients = calculateNutrientsPerServing(
				nutrients,
				selectedServing.serving_weight,
			)
			setNutrientsPerServing(calculatedNutrients)
		}
	}, [selectedServing])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.inputsSection}>
				<StyledText type="subtitle">{foodName}</StyledText>

				<View style={styles.inputContainer}>
					<MCIcon name="fraction-one-half" color="grayDark" size="xxl" />

					<Input
						value={servingAmount?.toString()}
						setValue={setServingAmount}
						placeholder="Amount"
						type="numeric"
						style={styles.input}
					/>
				</View>

				<View style={styles.inputContainer}>
					<MCIcon name="silverware-fork-knife" color="grayDark" size="xxl" />

					<DropdownMenu
						renderTrigger={
							<View style={[inputStyles.input, { flex: 1 }]}>
								<StyledText type="text">
									{selectedServing === "Custom"
										? "Custom (g)"
										: selectedServing?.serving_text}
								</StyledText>
							</View>
						}
						options={servings
							.map((serving) => ({
								text: serving.serving_text,
								onSelect: () => handleSelectServing(serving.id, false),
							}))
							.concat(
								servings.length > 0 && !servings[0].serving_weight
									? []
									: {
											text: "Custom (g)",
											onSelect: () => handleSelectServing(-1, true),
									  },
							)}
					/>
				</View>
			</View>

			{isLoadingAction ? (
				<Button title="" onPress={() => {}} isLoading />
			) : (
				<View style={styles.actionsContainer}>
					{isEditView ? (
						<Button
							title="Delete entry"
							onPress={() => setConfirmationModalVisible(true)}
							color="danger"
						/>
					) : null}
					<Button
						title={isEditView ? "Save changes" : "Add food"}
						onPress={handleAction}
						style={styles.actionBtn}
					/>
				</View>
			)}

			<MacrosSummaryCard
				amount={servingAmount ? parseFloat(servingAmount) : undefined}
				nutrientsPerServing={nutrientsPerServing}
				isCustom={selectedServing === "Custom"}
			/>

			<NutritionalInformation
				serving={selectedServing}
				nutrientsPerServing={nutrientsPerServing}
			/>

			{barcode && barcode !== "" ? (
				<View style={styles.inputContainer}>
					<MCIcon name="barcode" color="grayDark" size="xxl" />

					<StyledText type="text">{barcode}</StyledText>
				</View>
			) : null}

			<ConfirmationModal
				isVisible={confirmationModalVisible}
				setIsVisible={setConfirmationModalVisible}
				onConfirm={handleDeleteEntry}
				title="Are you sure you want to delete this entry?"
				confirmColor="danger"
				confirmText="Delete"
			/>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		gap: theme.spacing.l,
		paddingBottom: theme.spacing.xxl,
	},
	inputsSection: {
		gap: theme.spacing.xxs,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xxs,
	},
	input: {
		flex: 1,
	},
	actionsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.s,
	},
	actionBtn: {
		flex: 1,
	},
})
