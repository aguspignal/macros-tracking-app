import { calculateNutrientPerServingAmount } from "../../utils/helpers/foods"
import { Nutrients } from "../../types/foods"
import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import StyledText from "../texts/StyledText"

type Props = {
	amount: number | undefined
	nutrientsPerServing: Nutrients | undefined
	isCustom: boolean
}

export default function MacrosSummaryCard({ amount, nutrientsPerServing, isCustom }: Props) {
	if (!nutrientsPerServing) return null

	const kcal = calculateNutrientPerServingAmount(amount, nutrientsPerServing.calories, isCustom)
	const protein = calculateNutrientPerServingAmount(amount, nutrientsPerServing.protein, isCustom)
	const fat = calculateNutrientPerServingAmount(amount, nutrientsPerServing.fat, isCustom)
	const carbs = calculateNutrientPerServingAmount(
		amount,
		nutrientsPerServing.carbohydrates,
		isCustom,
	)

	return (
		<View style={styles.container}>
			<View style={styles.summaryContainer}>
				<View style={styles.macroContainer}>
					<StyledText type="text">Calories</StyledText>
					<StyledText type="boldText">{kcal.toFixed(1)}</StyledText>
				</View>
				<View style={styles.macroContainer}>
					<StyledText type="text">Protein</StyledText>
					<StyledText type="boldText">{protein.toFixed(1)}</StyledText>
				</View>
				<View style={styles.macroContainer}>
					<StyledText type="text">Fat</StyledText>
					<StyledText type="boldText">{fat.toFixed(1)}</StyledText>
				</View>
				<View style={styles.macroContainer}>
					<StyledText type="text">Carbs</StyledText>
					<StyledText type="boldText">{carbs.toFixed(1)}</StyledText>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.backgroundGray,
		borderRadius: theme.spacing.xxs,
		paddingVertical: theme.spacing.xs,
	},
	summaryContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.xl,
	},
	macroContainer: {
		alignItems: "center",
	},
})
