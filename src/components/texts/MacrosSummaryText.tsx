import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import StyledText from "./StyledText"

type Props = {
	protein?: number
	fat?: number
	carbs?: number
	color?: keyof typeof theme.colors
}
export default function MacrosSummaryText({
	protein = 0,
	fat = 0,
	carbs = 0,
	color = "grayDark",
}: Props) {
	return (
		<View style={styles.container}>
			<StyledText type="text" color={color}>{`${protein} P`}</StyledText>
			<StyledText type="text" color={color}>{`${fat} F`}</StyledText>
			<StyledText type="text" color={color}>{`${carbs} C`}</StyledText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
	},
})
