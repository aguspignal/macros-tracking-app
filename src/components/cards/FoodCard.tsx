import { BasicMacros, DatabaseFood } from "../../types/foods"
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
	servingText: string
	macros?: BasicMacros
	onPressAdd?: () => void
	onPressTrash?: () => void
}

export default function FoodCard({ food, servingText, macros, onPressAdd, onPressTrash }: Props) {
	const nav = useNavigation<RootStackNavigationProp>()

	const [isFoodSelected, setIsFoodSelected] = useState(false)

	function handleSelectFood() {
		if (!onPressAdd || isFoodSelected) {
			setIsFoodSelected(false)
			return
		}

		setIsFoodSelected(true)
		onPressAdd()
	}

	function navToFood() {
		// nav.navigate("Food",)
	}

	return (
		<TouchableOpacity onPress={navToFood} style={styles.container}>
			<View style={styles.leftContainer}>
				<StyledText type="text">{food.name}</StyledText>

				<View style={styles.servingContainer}>
					<MCIcon name="silverware-fork-knife" color="primary" size="s" />

					<StyledText type="note" color="primary">
						{servingText}
					</StyledText>
				</View>

				{macros ? (
					<MacrosSummaryText
						protein={macros.protein}
						fat={macros.fat}
						carbs={macros.carbohydrates}
					/>
				) : null}
			</View>

			<View style={styles.kcalsAndAction}>
				<StyledText type="boldText" color="grayDark">
					000
				</StyledText>

				{onPressAdd ? (
					<IconButton
						icon="plus"
						onPress={handleSelectFood}
						isBordered={!isFoodSelected}
					/>
				) : null}

				{onPressTrash ? (
					<TouchableOpacity onPress={onPressTrash}>
						<MCIcon name="trash-can" />
					</TouchableOpacity>
				) : null}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: theme.colors.purple,
		paddingVertical: theme.spacing.xs,
	},
	leftContainer: {
		gap: 4,
	},
	servingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	kcalsAndAction: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.s,
	},
})
