import { DatabaseServing, Nutrients } from "../../types/foods"
import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import NutritionalInformationItem from "../cards/NutritionalInformationItem"
import StyledText from "../texts/StyledText"

type Props = {
	nutrientsPerServing: Nutrients | undefined
	serving: DatabaseServing | "Custom" | undefined
}

export default function NutritionalInformation({ nutrientsPerServing, serving }: Props) {
	return (
		<View style={styles.nutritionalInformationSection}>
			<View>
				<StyledText type="title">Nutritional information</StyledText>
				<StyledText type="boldText">{`Per ${
					serving === "Custom" ? "100 g" : serving?.serving_text
				}`}</StyledText>
			</View>

			<View style={styles.nutrientsContainer}>
				<NutritionalInformationItem
					nutrientName="Calories"
					amount={nutrientsPerServing?.calories}
					unit="kcal"
				/>
				<NutritionalInformationItem
					nutrientName="Protein"
					amount={nutrientsPerServing?.protein}
					unit="g"
				/>
				<View style={styles.subNutrientsContainer}>
					<NutritionalInformationItem
						nutrientName="Fat"
						amount={nutrientsPerServing?.fat}
						unit="g"
					/>
					<NutritionalInformationItem
						nutrientName="Saturated fat"
						amount={nutrientsPerServing?.saturated_fat}
						unit="g"
						isSubNutrient
					/>
					<NutritionalInformationItem
						nutrientName="Monounsaturated fat"
						amount={nutrientsPerServing?.monounsaturated_fat}
						unit="g"
						isSubNutrient
					/>
					<NutritionalInformationItem
						nutrientName="Polyunsaturated fat"
						amount={nutrientsPerServing?.polyunsaturated_fat}
						unit="g"
						isSubNutrient
					/>
					<NutritionalInformationItem
						nutrientName="Trans fat"
						amount={nutrientsPerServing?.trans_fat}
						unit="g"
						isSubNutrient
					/>
				</View>

				<View style={styles.subNutrientsContainer}>
					<NutritionalInformationItem
						nutrientName="Carbohydrates"
						amount={nutrientsPerServing?.carbohydrates}
						unit="g"
					/>
					<NutritionalInformationItem
						nutrientName="Total sugars"
						amount={nutrientsPerServing?.total_sugars}
						unit="g"
						isSubNutrient
					/>
					<NutritionalInformationItem
						nutrientName="Added sugars"
						amount={nutrientsPerServing?.added_sugars}
						unit="g"
						isSubNutrient
					/>
				</View>

				<NutritionalInformationItem
					nutrientName="Fiber"
					amount={nutrientsPerServing?.fiber}
					unit="g"
				/>
				<NutritionalInformationItem
					nutrientName="Sodium"
					amount={nutrientsPerServing?.sodium}
					unit="mg"
				/>
				<NutritionalInformationItem
					nutrientName="Potassium"
					amount={nutrientsPerServing?.potassium}
					unit="mg"
				/>
				<NutritionalInformationItem
					nutrientName="Cholesterol"
					amount={nutrientsPerServing?.cholesterol}
					unit="mg"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
