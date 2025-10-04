import { inputStyles } from "../resources/styles/inputStyles"
import { RootStackScreenProps } from "../types/navigation"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { theme } from "../resources/theme"
import { useState } from "react"
import Button from "../components/buttons/Button"
import MCIcon from "../components/icons/MCIcon"
import useFoodQuery from "../hooks/useFoodQuery"

export default function SearchFood({ navigation, route }: RootStackScreenProps<"SearchFood">) {
	const { searchFoodsByName } = useFoodQuery()

	const [foodSearch, setFoodSearch] = useState("")

	function handleSearch() {
		console.log(foodSearch)
	}

	return (
		<View style={styles.container}>
			<View style={inputStyles.containerWithIcon}>
				<TextInput
					value={foodSearch}
					onChangeText={setFoodSearch}
					placeholder="Search for food..."
					style={inputStyles.input}
				/>

				<TouchableOpacity
					onPress={handleSearch}
					activeOpacity={1}
					style={inputStyles.rightIconContainer}
				>
					<MCIcon name="magnify" color="primary" style={inputStyles.rightIcon} />
				</TouchableOpacity>
			</View>

			<Button
				onPress={() => {}}
				title="Scan barcode"
				titleColor="textLight"
				icon="barcode-scan"
				iconDirection="right"
				iconColor="primary"
				color="backgroundGray"
				size="l"
				alignSelf
				style={styles.scanBtn}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		gap: theme.spacing.l,
	},
	inputContainer: {
		position: "relative",
	},
	input: {
		backgroundColor: theme.colors.backgroundGray,
		color: theme.colors.textLight,
		padding: theme.spacing.s,
		borderRadius: theme.spacing.xxs,
		fontSize: theme.fontSize.s,
	},
	scanBtn: {
		position: "absolute",
		bottom: theme.spacing.x4l,
	},
	magnifyBtn: {
		// backgroundColor: theme.colors.backgroundLight,
		position: "absolute",
		right: 0,
		padding: theme.spacing.s,
	},
})
