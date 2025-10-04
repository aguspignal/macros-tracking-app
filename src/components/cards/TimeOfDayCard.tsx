import { FoodAndServing, TimeOfDay } from "../../types/foods"
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import { useState } from "react"
import FoodCard from "./FoodCard"
import MacrosSummaryText from "../texts/MacrosSummaryText"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	timeOfDay: TimeOfDay
	onPressAdd: (timeOfDay: TimeOfDay) => void
	foodsAndServings?: FoodAndServing[]
}

export default function TimeOfDayCard({ timeOfDay, onPressAdd, foodsAndServings }: Props) {
	const headerBackground: StyleProp<ViewStyle> = {
		backgroundColor:
			timeOfDay === "Breakfast"
				? theme.colors.orange
				: timeOfDay === "Lunch"
				? theme.colors.lighBlue
				: timeOfDay === "Snacks"
				? theme.colors.darkGreen
				: theme.colors.purple,
	}

	const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)

	function toggleSummaryExpanded() {
		setIsSummaryExpanded((prev) => !prev)
	}

	return (
		<View style={styles.container}>
			<View style={[headerBackground, styles.rowContainer, styles.header]}>
				<TouchableOpacity
					onPress={toggleSummaryExpanded}
					activeOpacity={0.9}
					style={[styles.headerTitle, styles.rowContainer]}
				>
					<StyledText type="subtitle">{timeOfDay}</StyledText>

					<MCIcon
						name={isSummaryExpanded ? "chevron-up" : "chevron-down"}
						color="textLight"
						size="xxl"
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onPressAdd(timeOfDay)} activeOpacity={0.8}>
					<MCIcon name="plus-thick" color="primary" size="xxl" />
				</TouchableOpacity>
			</View>

			<View style={styles.summaryContainer}>
				{!isSummaryExpanded ? null : (
					<View style={styles.foodsContainer}>
						{foodsAndServings?.map((fs) => (
							<FoodCard food={fs.food} servingText={fs.serving.serving_text} />
						))}
					</View>
				)}
				<TouchableOpacity
					onPress={toggleSummaryExpanded}
					style={[
						styles.macrosSummaryTextContianer,
						isSummaryExpanded && foodsAndServings?.length ? styles.borderTop : null,
					]}
				>
					<MacrosSummaryText kcal={123} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	rowContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	header: {
		borderTopStartRadius: theme.spacing.xs,
		borderTopEndRadius: theme.spacing.xs,
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.s,
		paddingVertical: theme.spacing.xs,
	},
	headerTitle: {
		flex: 1,
	},
	summaryContainer: {
		backgroundColor: theme.colors.backgroundDark,
		borderBottomStartRadius: theme.spacing.xs,
		borderBottomEndRadius: theme.spacing.xs,
	},
	foodsContainer: {
		paddingHorizontal: theme.spacing.s,
	},
	macrosSummaryTextContianer: {
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.s,
		paddingVertical: theme.spacing.xs,
	},
	borderTop: {
		borderTopWidth: 1,
		borderColor: theme.colors.backgroundGray,
	},
})
