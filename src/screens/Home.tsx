import { RootStackNavigationProp, TabScreenProps } from "../types/navigation"
import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { TimeOfDay } from "../types/foods"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/buttons/Button"
import StyledText from "../components/texts/StyledText"
import TimeOfDayCard from "../components/cards/TimeOfDayCard"
import { useUserStore } from "../stores/userStore"

export default function Home({}: TabScreenProps<"Home">) {
	const { foodEntries } = useUserStore()
	const { navigate } = useNavigation<RootStackNavigationProp>()

	function handleAddFood(timeOfDay: TimeOfDay) {
		navigate("SearchFood", { timeOfDay })
	}

	let totalCalories = foodEntries.reduce((sum, fe) => sum + (fe.macros?.calories ?? 0), 0)
	let totalProtein = foodEntries.reduce((sum, fe) => sum + (fe.macros?.protein ?? 0), 0)
	let totalFat = foodEntries.reduce((sum, fe) => sum + (fe.macros?.fat ?? 0), 0)
	let totalCarbs = foodEntries.reduce((sum, fe) => sum + (fe.macros?.carbohydrates ?? 0), 0)

	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
			<View style={styles.summaryContainer}>
				<StyledText type="title" align="center">
					{`${totalCalories.toFixed(0)} Calories`}
				</StyledText>

				<View style={styles.macrosWrapper}>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Protein</StyledText>
						<StyledText type="subtitle">{totalProtein.toFixed(1) + " g"}</StyledText>
					</View>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Fat</StyledText>
						<StyledText type="subtitle">{totalFat.toFixed(1) + " g"}</StyledText>
					</View>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Carbs</StyledText>
						<StyledText type="subtitle">{totalCarbs.toFixed(1) + " g"}</StyledText>
					</View>
				</View>
			</View>

			<View style={styles.timesOfDayContainer}>
				<TimeOfDayCard timeOfDay="Breakfast" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Lunch" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Snacks" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Dinner" onPressAdd={handleAddFood} />
			</View>

			<Button title="Set goals" onPress={() => {}} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		paddingBottom: theme.spacing.xxl,
		gap: theme.spacing.l,
	},
	summaryContainer: {
		gap: theme.spacing.xs,
	},
	macrosWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing.xxl,
	},
	macroContainer: {
		alignItems: "center",
	},
	timesOfDayContainer: {
		gap: theme.spacing.s,
	},
})
