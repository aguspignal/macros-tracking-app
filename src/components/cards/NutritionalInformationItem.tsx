import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import StyledText from "../texts/StyledText"

type Props = {
	nutrientName: string
	amount: number
	unit: string
	isSubNutrient?: boolean
}

export default function NutritionalInformationItem({
	nutrientName,
	amount,
	unit,
	isSubNutrient = false,
}: Props) {
	return (
		<View style={[styles.container, isSubNutrient ? styles.subNutrient : null]}>
			<StyledText type="text" color={isSubNutrient ? "grayDark" : "textLight"}>
				{nutrientName}
			</StyledText>

			<StyledText type="boldText">{`${amount} ${unit}`}</StyledText>
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
