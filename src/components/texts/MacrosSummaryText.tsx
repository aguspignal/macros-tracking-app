import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import StyledText from "./StyledText"

type Props = {
	protein?: number
	fat?: number
	carbs?: number
	kcal?: number
	textType?: "text" | "note"
	color?: keyof typeof theme.colors
}
export default function MacrosSummaryText({
	protein = 0,
	fat = 0,
	carbs = 0,
	kcal = undefined,
	textType = "text",
	color = "grayDark",
}: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.nutrients}>
				{kcal ? (
					<View style={[styles.macroText, { gap: 2 }]}>
						<StyledText type={textType} color={color}>
							{kcal.toFixed(0)}
						</StyledText>
						<StyledText type={textType} color={color}>
							kcal
						</StyledText>
					</View>
				) : null}

				<View style={styles.macroText}>
					<StyledText type={textType} color={color}>{`${protein.toFixed(1)}`}</StyledText>
					<StyledText type={"text"} color={color}>
						P
					</StyledText>
				</View>
				<View style={styles.macroText}>
					<StyledText type={textType} color={color}>{`${fat.toFixed(1)}`}</StyledText>
					<StyledText type={"text"} color={color}>
						F
					</StyledText>
				</View>
				<View style={styles.macroText}>
					<StyledText type={textType} color={color}>{`${carbs.toFixed(1)}`}</StyledText>
					<StyledText type={"text"} color={color}>
						C
					</StyledText>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	nutrients: {
		gap: theme.spacing.xs,
		flexDirection: "row",
		alignItems: "center",
	},
	macroText: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
})
