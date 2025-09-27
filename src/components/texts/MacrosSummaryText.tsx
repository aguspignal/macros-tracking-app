import { StyleSheet, Text, View } from "react-native"
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
			<StyledText type="text" color={color}>{`P: ${protein}`}</StyledText>
			<StyledText type="text" color={color}>{`F: ${fat}`}</StyledText>
			<StyledText type="text" color={color}>{`C: ${carbs}`}</StyledText>
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
