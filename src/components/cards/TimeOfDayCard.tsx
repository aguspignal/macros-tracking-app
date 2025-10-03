import { FoodAndServing, TimeOfDay } from "../../types/foods"
import { ScrollView, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
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
		<ScrollView style={styles.container}>
			<View style={[headerBackground, styles.rowContainer, styles.header]}>
				<TouchableOpacity
					onPress={toggleSummaryExpanded}
					activeOpacity={0.9}
					style={styles.rowContainer}
				>
					<StyledText type="subtitle">{timeOfDay}</StyledText>

					<MCIcon name="chevron-down" color="textLight" />
				</TouchableOpacity>

				<View style={styles.rowContainer}>
					<StyledText type="subtitle">000</StyledText>

					<TouchableOpacity onPress={() => onPressAdd(timeOfDay)} activeOpacity={0.8}>
						<MCIcon name="plus-thick" color="primary" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.summaryContainer}>
				{!isSummaryExpanded ? (
					<TouchableOpacity onPress={() => setIsSummaryExpanded(true)}>
						<MacrosSummaryText />
					</TouchableOpacity>
				) : (
					<View style={styles.foodsContainer}>
						{foodsAndServings?.map((fs) => (
							<FoodCard food={fs.food} servingText={fs.serving.serving_text} />
						))}
					</View>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {},
	rowContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	header: {
		justifyContent: "space-between",
	},
	title: {
		fontSize: theme.fontSize.l,
		fontWeight: "600",
		color: theme.colors.textLight,
	},
	summaryContainer: {
		backgroundColor: theme.colors.backgroundDark,
	},
	foodsContainer: {},
})
