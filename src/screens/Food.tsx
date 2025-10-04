import { RootStackScreenProps } from "../types/navigation"
import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { useState } from "react"
import Button from "../components/buttons/Button"
import Input from "../components/inputs/Input"
import MCIcon from "../components/icons/MCIcon"
import NutritionalInformationItem from "../components/cards/NutritionalInformationItem"
import StyledText from "../components/texts/StyledText"

export default function Food({ navigation, route }: RootStackScreenProps<"Food">) {
	const { food: foodServingsNutrients } = route.params
	const { nutrients, servings, food } = foodServingsNutrients

	const [servingAmount, setServingAmount] = useState<string | undefined>(undefined)
	const [serving, setServing] = useState<string | undefined>(servings[0]?.serving_text)

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.inputsSection}>
				<StyledText type="subtitle">{food.name}</StyledText>

				<View style={styles.inputContainer}>
					<MCIcon name="fraction-one-half" color="grayDark" size="xxl" />

					<Input
						value={servingAmount?.toString()}
						setValue={setServingAmount}
						placeholder="Amount"
						type="numeric"
						style={styles.input}
					/>
				</View>

				<View style={styles.inputContainer}>
					<MCIcon name="silverware-fork-knife" color="grayDark" size="xxl" />

					<Input
						value={serving}
						setValue={setServing}
						placeholder="Serving"
						style={styles.input}
					/>
				</View>
			</View>

			<Button title="Add food" onPress={() => {}} />

			<View style={styles.nutritionalInformationSection}>
				<View>
					<StyledText type="title">Nutritional information</StyledText>
					<StyledText type="boldText">Per 1 serving</StyledText>
				</View>

				<View style={styles.nutrientsContainer}>
					<NutritionalInformationItem
						nutrientName="Calories"
						amount={nutrients.calories}
						unit="kcal"
					/>
					<NutritionalInformationItem
						nutrientName="Protein"
						amount={nutrients.protein}
						unit="g"
					/>
					<View style={styles.subNutrientsContainer}>
						<NutritionalInformationItem
							nutrientName="Fat"
							amount={nutrients.fat}
							unit="g"
						/>
						<NutritionalInformationItem
							nutrientName="Saturated fat"
							amount={nutrients.saturated_fat}
							unit="g"
							isSubNutrient
						/>
						<NutritionalInformationItem
							nutrientName="Monounsaturated fat"
							amount={nutrients.monounsaturated_fat}
							unit="g"
							isSubNutrient
						/>
						<NutritionalInformationItem
							nutrientName="Polyunsaturated fat"
							amount={nutrients.polyunsaturated_fat}
							unit="g"
							isSubNutrient
						/>
						<NutritionalInformationItem
							nutrientName="Trans fat"
							amount={nutrients.trans_fat}
							unit="g"
							isSubNutrient
						/>
					</View>

					<View style={styles.subNutrientsContainer}>
						<NutritionalInformationItem
							nutrientName="Carbohydrates"
							amount={nutrients.carbohydrates}
							unit="g"
						/>
						<NutritionalInformationItem
							nutrientName="Total sugars"
							amount={nutrients.total_sugars}
							unit="g"
							isSubNutrient
						/>
						<NutritionalInformationItem
							nutrientName="Added sugars"
							amount={nutrients.added_sugars}
							unit="g"
							isSubNutrient
						/>
					</View>

					<NutritionalInformationItem
						nutrientName="Fiber"
						amount={nutrients.fiber}
						unit="g"
					/>
					<NutritionalInformationItem
						nutrientName="Sodium"
						amount={nutrients.sodium}
						unit="mg"
					/>
					<NutritionalInformationItem
						nutrientName="Potassium"
						amount={nutrients.potassium}
						unit="mg"
					/>
					<NutritionalInformationItem
						nutrientName="Cholesterol"
						amount={nutrients.cholesterol}
						unit="mg"
					/>
				</View>
			</View>

			{food.barcode && food.barcode !== "" ? (
				<View style={styles.inputContainer}>
					<MCIcon name="barcode" color="grayDark" size="xxl" />

					<StyledText type="text">{food.barcode}</StyledText>
				</View>
			) : null}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		gap: theme.spacing.l,
		paddingBottom: theme.spacing.xxl,
	},
	inputsSection: {
		gap: theme.spacing.xxs,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xxs,
	},
	input: {
		flex: 1,
	},
	nutritionalInformationSection: {
		gap: theme.spacing.s,
	},
	nutrientsContainer: {
		gap: theme.spacing.s,
	},
	subNutrientsContainer: {
		gap: theme.spacing.xxs,
	},
})
