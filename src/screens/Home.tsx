import { ScrollView, StyleSheet, View } from "react-native"
import { RootStackNavigationProp, TabScreenProps } from "../types/navigation"
import { theme } from "../resources/theme"
import { TimeOfDay } from "../types/foods"
import Button from "../components/buttons/Button"
import StyledText from "../components/texts/StyledText"
import TimeOfDayCard from "../components/cards/TimeOfDayCard"
import useSession from "../hooks/useSession"
import { useNavigation } from "@react-navigation/native"

export default function Home({ navigation }: TabScreenProps<"Home">) {
	const { endSession } = useSession()
	const { navigate } = useNavigation<RootStackNavigationProp>()

	function handleAddFood(timeOfDay: TimeOfDay) {
		navigate("SearchFood", { timeOfDay })
	}

	function handleLogout() {
		endSession()
	}

	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
			<View style={styles.summaryContainer}>
				<StyledText type="title" align="center">
					2000 Calories
				</StyledText>

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

			<Button title="Logout" color="textLight" onPress={handleLogout} isBordered />
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
