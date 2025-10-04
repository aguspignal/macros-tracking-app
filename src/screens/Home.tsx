import { FoodServingsNutrients, OpenFoodFactsParsedProduct, TimeOfDay } from "../types/foods"
import { RootStackNavigationProp, TabScreenProps } from "../types/navigation"
import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/buttons/Button"
import StyledText from "../components/texts/StyledText"
import TimeOfDayCard from "../components/cards/TimeOfDayCard"
import useSession from "../hooks/useSession"

const mockupFood: FoodServingsNutrients = {
	food: {
		id: -1,
		barcode: "733480014000",
		name: "Food name",
		last_update: "",
		user_id: null,
		source: "off",
	},
	servings: [
		{
			id: -1,
			food_id: -1,
			is_grams: true,
			serving_text: "1 Serving",
			serving_weight: 100,
		},
	],
	nutrients: {
		id: -1,
		food_id: -1,
		calories: 0,
		protein: 0,
		fat: 0,
		carbohydrates: 0,
		fiber: 0,
		total_sugars: 0,
		sodium: 0,
		added_sugars: 0,
		cholesterol: 0,
		potassium: 0,
		monounsaturated_fat: 0,
		polyunsaturated_fat: 0,
		trans_fat: 0,
		saturated_fat: 0,
	},
}

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
			<Button
				title="See food page"
				onPress={() => navigate("Food", { food: mockupFood, timeOfDay: "Lunch" })}
			/>

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
