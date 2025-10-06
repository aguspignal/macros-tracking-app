import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import StyledText from "../texts/StyledText"

type Props = {
	nutrientName: string
	amount: number | string | undefined
	unit: string
	isSubNutrient?: boolean
}

export default function NutritionalInformationItem({
	nutrientName,
	amount,
	unit,
	isSubNutrient = false,
}: Props) {
	const amountText = !amount
		? "-"
		: typeof amount === "number"
		? `${amount.toFixed(1)} ${unit}`
		: `${amount} ${unit}`

	return (
		<View style={[styles.container, isSubNutrient ? styles.subNutrient : null]}>
			<StyledText type="text" color={isSubNutrient ? "grayDark" : "textLight"}>
				{nutrientName}
			</StyledText>

			<StyledText type="boldText" color={isSubNutrient ? "grayDark" : "textLight"}>
				{amountText}
			</StyledText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 4,
		borderBottomWidth: 1,
		borderColor: theme.colors.grayDark,
	},
	subNutrient: {
		paddingLeft: theme.spacing.s,
		borderBottomWidth: 0,
		paddingBottom: 0,
	},
})
