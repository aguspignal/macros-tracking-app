import { RootStackScreenProps } from "../types/navigation"
import { StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { useState } from "react"
import Button from "../components/buttons/Button"
import Input from "../components/inputs/Input"
import useFoodQuery from "../hooks/useFoodQuery"

export default function SearchFood({ navigation, route }: RootStackScreenProps<"SearchFood">) {
	const { searchFoodsByName } = useFoodQuery()

	const [foodSearch, setFoodSearch] = useState("")

	function handleSearch() {
		console.log(foodSearch)
	}

	function handleScanBarcode() {
		navigation.navigate("ScanBarcode", { timeOfDay: route.params?.timeOfDay })
	}

	return (
		<View style={styles.container}>
			<Input
				setValue={setFoodSearch}
				value={foodSearch}
				placeholder="Search food"
				icon="magnify"
				iconColor="primary"
				onPressIcon={handleSearch}
			/>

			<Button
				onPress={handleScanBarcode}
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
