import { StyleSheet, View } from "react-native"
import { TabScreenProps } from "../types/navigation"
import { theme } from "../resources/theme"
import { TimeOfDay } from "../types/supabase"
import Button from "../components/buttons/Button"
import StyledText from "../components/texts/StyledText"
import TimeOfDayCard from "../components/cards/TimeOfDayCard"

export default function Home({ navigation }: TabScreenProps<"Home">) {
	function handleAddFood(timeOfDay: TimeOfDay) {
		console.log(timeOfDay)
	}

	return (
		<View style={styles.container}>
			<StyledText type="title">Summary here</StyledText>

			<View style={styles.timesOfDayContainer}>
				<TimeOfDayCard timeOfDay="Breakfast" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Lunch" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Snacks" onPressAdd={handleAddFood} />
				<TimeOfDayCard timeOfDay="Dinner" onPressAdd={handleAddFood} />
			</View>

			<Button title="Set goals" onPress={() => {}} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
	},
	timesOfDayContainer: {
		gap: theme.spacing.s,
	},
})
