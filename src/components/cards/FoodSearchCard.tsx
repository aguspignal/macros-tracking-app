import { BasicMacros, DatabaseFood, FoodBasicMacros, TimeOfDay } from "../../types/foods"
import { RootStackNavigationProp } from "../../types/navigation"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { theme } from "../../resources/theme"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import IconButton from "../buttons/IconButton"
import MacrosSummaryText from "../texts/MacrosSummaryText"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	food: DatabaseFood
	macros: BasicMacros
	timeOfDay: TimeOfDay | undefined
	onSelectFood: (foodBasicMacros: FoodBasicMacros) => void
	onDeselectFood: (foodBasicMacros: FoodBasicMacros) => void
}

export default function FoodSearchCard({
	food,
	macros,
	timeOfDay,
	onSelectFood,
	onDeselectFood,
}: Props) {
	const nav = useNavigation<RootStackNavigationProp>()

	const [isFoodSelected, setIsFoodSelected] = useState(false)

	function handleAction() {
		if (isFoodSelected) onDeselectFood({ food, macros })
		else onSelectFood({ food, macros })

		setIsFoodSelected((prev) => !prev)
	}

	function navToFood() {
		nav.navigate("AddFood", { food_id: food.id, isScannedProduct: false, timeOfDay })
	}

	return (
		<TouchableOpacity onPress={navToFood} style={styles.container}>
			<View style={styles.leftContainer}>
				<StyledText type="text">{food.name}</StyledText>

				{macros ? (
					<MacrosSummaryText
						kcal={macros.calories}
						protein={macros.protein}
						fat={macros.fat}
						carbs={macros.carbohydrates}
					/>
				) : null}
			</View>

			{/* <IconButton
				icon={isFoodSelected ? "check" : "plus"}
				size="s"
				onPress={handleAction}
				isBordered={!isFoodSelected}
			/> */}
			<MCIcon name="chevron-right" color="grayDark" size="l" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: theme.spacing.xxs,
	},
	leftContainer: {
		gap: 4,
	},
})
