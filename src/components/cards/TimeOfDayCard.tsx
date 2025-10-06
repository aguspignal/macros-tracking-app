import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import { TimeOfDay } from "../../types/foods"
import { useEffect, useState } from "react"
import { useUserStore } from "../../stores/userStore"
import FoodEntryCard from "./FoodEntryCard"
import MacrosSummaryText from "../texts/MacrosSummaryText"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	timeOfDay: TimeOfDay
	onPressAdd: (timeOfDay: TimeOfDay) => void
}

export default function TimeOfDayCard({ timeOfDay, onPressAdd }: Props) {
	const { foodEntries } = useUserStore()

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

	let totalCalories = foodEntries
		.filter((fe) => fe.entry.time_day === timeOfDay)
		.reduce((sum, fe) => sum + (fe.macros?.calories ?? 0), 0)
	let totalProtein = foodEntries
		.filter((fe) => fe.entry.time_day === timeOfDay)
		.reduce((sum, fe) => sum + (fe.macros?.protein ?? 0), 0)
	let totalFat = foodEntries
		.filter((fe) => fe.entry.time_day === timeOfDay)
		.reduce((sum, fe) => sum + (fe.macros?.fat ?? 0), 0)
	let totalCarbs = foodEntries
		.filter((fe) => fe.entry.time_day === timeOfDay)
		.reduce((sum, fe) => sum + (fe.macros?.carbohydrates ?? 0), 0)

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
				{isSummaryExpanded ? (
					<View style={styles.foodsContainer}>
						{foodEntries
							.filter((fe) => fe.entry.time_day === timeOfDay)
							.map((fe) => (
								<FoodEntryCard entry={fe} key={fe.entry.id} />
							))}
					</View>
				) : null}

				<TouchableOpacity
					onPress={toggleSummaryExpanded}
					style={[
						styles.macrosSummaryTextContianer,
						isSummaryExpanded && foodEntries?.length ? styles.borderTop : null,
					]}
				>
					<MacrosSummaryText protein={totalProtein} fat={totalFat} carbs={totalCarbs} />

					<StyledText type="boldText" color="grayDark">
						{totalCalories.toFixed(0)}
					</StyledText>
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
	noFoodsContainer: {
		paddingVertical: theme.spacing.xxs,
	},
	macrosSummaryTextContianer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.s,
		paddingVertical: theme.spacing.xs,
	},
	borderTop: {
		borderTopWidth: 1,
		borderColor: theme.colors.backgroundGray,
	},
})
