import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import { FoodBasicMacros } from "../types/foods"
import { RootStackScreenProps } from "../types/navigation"
import { theme } from "../resources/theme"
import { useEffect, useState } from "react"
import Button from "../components/buttons/Button"
import FoodSearchCard from "../components/cards/FoodSearchCard"
import Input from "../components/inputs/Input"
import useFoodQuery from "../hooks/useFoodQuery"

export default function SearchFood({ navigation, route }: RootStackScreenProps<"SearchFood">) {
	const { searchFoodsByNameLazy } = useFoodQuery()

	const [foodSearch, setFoodSearch] = useState("")
	const [searchResult, setSearchResult] = useState<FoodBasicMacros[]>([])
	const [selectedFoods, setSelectedFoods] = useState<FoodBasicMacros[]>([])

	const { isFetching, isLoading, data, refetch: searchFoods } = searchFoodsByNameLazy(foodSearch)

	function handleSearch() {
		if (!foodSearch) return
		searchFoods()
	}

	function handleScanBarcode() {
		navigation.navigate("ScanBarcode", { timeOfDay: route.params?.timeOfDay })
	}

	function handleSelectFood(food: FoodBasicMacros) {
		setSelectedFoods((prev) => [...prev, food])
	}

	function handleDeselectFood(food: FoodBasicMacros) {
		setSelectedFoods((prev) => prev.filter((f) => f.food.id !== food.food.id))
	}

	function handleAddFoods() {}

	useEffect(() => {
		if (data) {
			setSearchResult(data)
		}
	}, [data])

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

			{isFetching || isLoading ? (
				<ActivityIndicator color={theme.colors.primary} size={theme.fontSize.h3} />
			) : null}

			<FlatList
				data={searchResult}
				contentContainerStyle={styles.searchResultList}
				renderItem={({ item }) => (
					<FoodSearchCard
						key={item.food.id}
						food={item.food}
						macros={item.macros}
						timeOfDay={route.params.timeOfDay}
						onSelectFood={handleSelectFood}
						onDeselectFood={handleDeselectFood}
					/>
				)}
			/>

			{selectedFoods.length === 0 ? (
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
			) : (
				<Button
					onPress={handleAddFoods}
					title={`Add ${selectedFoods.length} food${selectedFoods.length > 1 ? "s" : ""}`}
					titleColor="textDark"
					icon="check"
					iconDirection="right"
					iconColor="textDark"
					color="primary"
					size="l"
					alignSelf
					style={styles.scanBtn}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: theme.colors.backgroundBlack,
		paddingHorizontal: theme.spacing.s,
		gap: theme.spacing.s,
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
		bottom: theme.spacing.xxl,
	},
	magnifyBtn: {
		// backgroundColor: theme.colors.backgroundLight,
		position: "absolute",
		right: 0,
		padding: theme.spacing.s,
	},
	searchResultList: {
		gap: theme.spacing.xxs,
		paddingBottom: 120,
	},
})
