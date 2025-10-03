import { StyleSheet, View } from "react-native"
import { TabScreenProps } from "../types/navigation"
import { theme } from "../resources/theme"
import { TimeOfDay } from "../types/foods"
import Button from "../components/buttons/Button"
import StyledText from "../components/texts/StyledText"
import TimeOfDayCard from "../components/cards/TimeOfDayCard"
import useSession from "../hooks/useSession"

export default function Home({ navigation }: TabScreenProps<"Home">) {
	const { endSession } = useSession()

	function handleAddFood(timeOfDay: TimeOfDay) {
		console.log(timeOfDay)
	}

	function handleLogout() {
		endSession()
	}

	return (
		<View style={styles.container}>
			<View style={styles.summaryContainer}>
				<StyledText type="title">2000 Calories</StyledText>

				<View style={styles.macrosWrapper}>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Protein</StyledText>
						<StyledText type="subtitle">115g</StyledText>
					</View>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Fat</StyledText>
						<StyledText type="subtitle">43g</StyledText>
					</View>
					<View style={styles.macroContainer}>
						<StyledText type="subtitle">Carbs</StyledText>
						<StyledText type="subtitle">148g</StyledText>
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

			<Button title="Logout" onPress={handleLogout} isBordered />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
	},
	summaryContainer: {
		alignItems: "center",
	},
	macrosWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	macroContainer: {
		alignItems: "center",
	},
	timesOfDayContainer: {
		gap: theme.spacing.s,
	},
})
