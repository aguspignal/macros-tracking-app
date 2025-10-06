import { FoodEntryMacros } from "../../types/foods"
import { RootStackNavigationProp } from "../../types/navigation"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { theme } from "../../resources/theme"
import { useNavigation } from "@react-navigation/native"
import MacrosSummaryText from "../texts/MacrosSummaryText"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	entry: FoodEntryMacros
	showMacros?: boolean
	onPressTrash?: () => void
}

export default function FoodEntryCard({ entry, showMacros = false, onPressTrash }: Props) {
	const {
		foodName,
		macros,
		servingText,
		entry: { food_id, serving_amount, time_day },
	} = entry
	const nav = useNavigation<RootStackNavigationProp>()

	const servingDisplayText = servingText
		? `${serving_amount} x ${servingText}`
		: `${serving_amount} g`

	function navToFood() {
		nav.navigate("EditFoodEntry", { entry })
	}

	return (
		<TouchableOpacity onPress={navToFood} style={styles.container}>
			<View style={styles.leftContainer}>
				<StyledText type="text">{foodName}</StyledText>

				{macros && showMacros ? (
					<MacrosSummaryText
						protein={macros.protein}
						fat={macros.fat}
						carbs={macros.carbohydrates}
						textType="note"
					/>
				) : null}

				<View style={styles.servingContainer}>
					<MCIcon name="silverware-fork-knife" color="primary" size="s" />

					<StyledText type="boldNote" color="primary">
						{servingDisplayText}
					</StyledText>
				</View>
			</View>

			<View style={styles.kcalsAndAction}>
				<StyledText type="boldText" color="grayDark">
					{macros?.calories.toFixed(0) ?? 0}
				</StyledText>

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
