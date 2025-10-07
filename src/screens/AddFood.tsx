import {
	BasicMacros,
	FoodServingsNutrients,
	OpenFoodFactsParsedProduct,
	TimeOfDay,
} from "../types/foods"
import { RootStackNavigationProp, RootStackScreenProps } from "../types/navigation"
import { useNavigation } from "@react-navigation/native"
import { useUserStore } from "../stores/userStore"
import ErrorScreen from "./ErrorScreen"
import FoodInner from "./views/FoodInner"
import Loading from "./Loading"
import ToastNotification from "../components/notifications/ToastNotification"
import useFoodMutation from "../hooks/useFoodMutation"
import useFoodQuery from "../hooks/useFoodQuery"

export default function AddFood({ route }: RootStackScreenProps<"AddFood">) {
	const { getFoodServingNutrientsById } = useFoodQuery()

	const { food_id, isScannedProduct, offParsedFood, timeOfDay } = route.params

	if (isScannedProduct) return <ScannedFood parsedProduct={offParsedFood} timeOfDay={timeOfDay} />

	const { isPending, isFetching, error, data } = getFoodServingNutrientsById(food_id)

	if (isPending || isFetching) return <Loading />
	if (error || !data) return <ErrorScreen />

	return <InternalFood foodServingNutrients={data} timeOfDay={timeOfDay} />
}

type ScannedFoodProps = {
	parsedProduct: OpenFoodFactsParsedProduct | undefined
	timeOfDay: TimeOfDay | undefined
}

function ScannedFood({ parsedProduct, timeOfDay }: ScannedFoodProps) {
	if (!parsedProduct) return <ErrorScreen />

	const { user, addOrUpdateFoodEntry } = useUserStore()
	const { createFoodServingNutrientsMutation, createFoodEntryMutation } = useFoodMutation()
	const {
		mutate: createFood,
		isPending: isPendingCreateFood,
	} = createFoodServingNutrientsMutation
	const { mutate: createEntry, isPending: isPendingCreateEntry } = createFoodEntryMutation
	const { navigate } = useNavigation<RootStackNavigationProp>()

	const { serving, nutrients, dataPer, ...food } = parsedProduct

	function handleAddFood(servingAmount: number, macros: BasicMacros, servingId?: number) {
		createFood(
			{ food, serving, nutrients, nutrientsDataPer: dataPer },
			{
				onSuccess: (foodServingNutrients) => {
					if (!foodServingNutrients) return

					const { food } = foodServingNutrients
					if (!timeOfDay) {
						ToastNotification({ title: "No time of day selected" })
						return
					}

					createEntry(
						{
							food_id: food.id,
							user_id: user?.id,
							serving_id: servingId,
							serving_amount: servingAmount,
							date: new Date().toISOString().split("T")[0],
							timeOfDay,
						},
						{
							onSuccess: (newEntry) => {
								if (!newEntry) return
								addOrUpdateFoodEntry({
									entry: newEntry,
									servingText: serving?.serving_text ?? null,
									foodName: food.name,
									macros,
								})
								navigate("Tabs", { screen: "Home" })
							},
						},
					)
				},
			},
		)
	}

	return (
		<FoodInner
			isEditView={false}
			foodName={food.name}
			barcode={food.barcode}
			nutrients={nutrients}
			servings={serving ? [serving] : []}
			onAction={handleAddFood}
			isLoadingAction={isPendingCreateEntry || isPendingCreateFood}
		/>
	)
}

type InternalFoodProps = {
	foodServingNutrients: FoodServingsNutrients
	timeOfDay: TimeOfDay | undefined
}

function InternalFood({ foodServingNutrients, timeOfDay }: InternalFoodProps) {
	const { food, nutrients, servings } = foodServingNutrients
	if (!nutrients) return <ErrorScreen />

	const { user, addOrUpdateFoodEntry } = useUserStore()
	const { createFoodEntryMutation } = useFoodMutation()
	const { mutate: createEntry, isPending } = createFoodEntryMutation
	const { navigate } = useNavigation<RootStackNavigationProp>()

	function handleAddFood(servingAmount: number, macros: BasicMacros, servingId?: number) {
		if (!user) return

		if (!timeOfDay) {
			ToastNotification({ title: "No time of day selected" })
			return
		}

		createEntry(
			{
				food_id: food.id,
				user_id: user?.id,
				serving_id: servingId,
				serving_amount: servingAmount,
				date: new Date().toISOString().split("T")[0],
				timeOfDay,
			},
			{
				onSuccess: (newEntry) => {
					if (!newEntry) return
					addOrUpdateFoodEntry({
						entry: newEntry,
						servingText: servings.find((s) => s.id === servingId)?.serving_text ?? null,
						foodName: food.name,
						macros,
					})
					navigate("Tabs", { screen: "Home" })
				},
			},
		)
	}

	return (
		<FoodInner
			isEditView={false}
			foodName={food.name}
			nutrients={nutrients}
			servings={servings}
			barcode={food.barcode}
			onAction={handleAddFood}
			isLoadingAction={isPending}
		/>
	)
}
