import { NutrientsString } from "../../types/foods"
import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import Input from "../inputs/Input"
import StyledText from "../texts/StyledText"

type Props = {
	nutrients: NutrientsString
	onChange: (key: keyof NutrientsString, value: string) => void
	formErrors: Record<string, string>
}

export default function NutritionalInformationInputs({ nutrients, onChange, formErrors }: Props) {
	return (
		<View style={styles.nutritionalInformationSection}>
			<View>
				<StyledText type="title">Nutritional information</StyledText>
				<StyledText type="boldText">Per serving</StyledText>
			</View>

			<View style={styles.nutrientsContainer}>
				<Input
					label="Calories"
					value={nutrients.calories}
					setValue={(v) => onChange("calories", v)}
					type="numeric"
					placeholder="g"
					errorMessage={formErrors?.["nutrients.calories"]}
				/>
				<Input
					label="Protein"
					value={nutrients.protein}
					setValue={(v) => onChange("protein", v)}
					type="numeric"
					placeholder="g"
					errorMessage={formErrors?.["nutrients.protein"]}
				/>
				<Input
					label="Fat"
					value={nutrients.fat}
					setValue={(v) => onChange("fat", v)}
					type="numeric"
					placeholder="g"
					errorMessage={formErrors?.["nutrients.fat"]}
				/>

				<View style={styles.subNutrientsContainer}>
					<Input
						label="Saturated fat"
						value={nutrients.saturated_fat}
						setValue={(v) => onChange("saturated_fat", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.saturated_fat"]}
					/>
					<Input
						label="Monounsaturated fat"
						value={nutrients.monounsaturated_fat}
						setValue={(v) => onChange("monounsaturated_fat", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.monounsaturated_fat"]}
					/>
					<Input
						label="Polyunsaturated fat"
						value={nutrients.polyunsaturated_fat}
						setValue={(v) => onChange("polyunsaturated_fat", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.polyunsaturated_fat"]}
					/>
					<Input
						label="Trans fat"
						value={nutrients.trans_fat}
						setValue={(v) => onChange("trans_fat", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.trans_fat"]}
					/>
				</View>
				<Input
					label="Carbohydrates"
					value={nutrients.carbohydrates}
					setValue={(v) => onChange("carbohydrates", v)}
					type="numeric"
					placeholder="g"
					errorMessage={formErrors?.["nutrients.carbohydrates"]}
				/>
				<View style={styles.subNutrientsContainer}>
					<Input
						label="Sugars"
						value={nutrients.total_sugars}
						setValue={(v) => onChange("total_sugars", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.total_sugars"]}
					/>
					<Input
						label="Added sugars"
						value={nutrients.added_sugars}
						setValue={(v) => onChange("added_sugars", v)}
						type="numeric"
						placeholder="g"
						isOptional
						errorMessage={formErrors?.["nutrients.added_sugars"]}
					/>
				</View>
				<Input
					label="Fiber"
					value={nutrients.fiber}
					setValue={(v) => onChange("fiber", v)}
					type="numeric"
					placeholder="g"
					isOptional
					errorMessage={formErrors?.["nutrients.fiber"]}
				/>
				<Input
					label="Sodium"
					value={nutrients.sodium}
					setValue={(v) => onChange("sodium", v)}
					type="numeric"
					placeholder="mg"
					isOptional
					errorMessage={formErrors?.["nutrients.sodium"]}
				/>
				<Input
					label="Potassium"
					value={nutrients.potassium}
					setValue={(v) => onChange("potassium", v)}
					type="numeric"
					placeholder="mg"
					isOptional
					errorMessage={formErrors?.["nutrients.potassium"]}
				/>
				<Input
					label="Cholesterol"
					value={nutrients.cholesterol}
					setValue={(v) => onChange("cholesterol", v)}
					type="numeric"
					placeholder="mg"
					isOptional
					errorMessage={formErrors?.["nutrients.cholesterol"]}
				/>
			</View>

			<StyledText type="note" align="center" color="grayDark">
				Empty fields will be set to zero
			</StyledText>
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
		borderLeftWidth: 1,
		borderLeftColor: theme.colors.grayDark,
		paddingLeft: theme.spacing.s,
	},
})
