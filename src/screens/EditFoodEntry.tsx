import { BasicMacros } from "../types/foods"
import { RootStackNavigationProp, RootStackScreenProps } from "../types/navigation"
import ErrorScreen from "./ErrorScreen"
import FoodInner from "./views/FoodInner"
import Loading from "./Loading"
import useFoodMutation from "../hooks/useFoodMutation"
import useFoodQuery from "../hooks/useFoodQuery"
import { useUserStore } from "../stores/userStore"
import { useNavigation } from "@react-navigation/native"

export default function EditFoodEntry({ route }: RootStackScreenProps<"EditFoodEntry">) {
	const {
		entry: { entry },
	} = route.params

	const { addOrUpdateFoodEntry, deleteFoodEntry } = useUserStore()
	const { updateFoodEntryMutation, deleteFoodEntryMutation } = useFoodMutation()
	const { mutate: updateEntry, isPending: isPendingUpdate } = updateFoodEntryMutation
	const { mutate: deleteEntry, isPending: isPendingDelete } = deleteFoodEntryMutation
	const { navigate } = useNavigation<RootStackNavigationProp>()

	const { getFoodServingNutrientsById } = useFoodQuery()
	const { isPending, isFetching, error, data } = getFoodServingNutrientsById(entry.food_id)

	function handleEditEntry(servingAmount: number, macros: BasicMacros, servingId?: number) {
		updateEntry(
			{
				entryId: entry.id,
				servingId: servingId ?? entry.serving_id,
				servingAmount,
			},
			{
				onSuccess: (newEntry) => {
					if (!newEntry) return

					addOrUpdateFoodEntry({
						entry: newEntry,
						foodName: data?.food.name ?? "",
						macros: macros,
						servingText:
							data?.servings.find((s) => s.id === servingId)?.serving_text ?? null,
					})
					navigate("Tabs", { screen: "Home" })
				},
			},
		)
	}

	function handleDeleteEntry() {
		deleteEntry(
			{ entryId: entry.id },
			{
				onSuccess: (count) => {
					if (!count) return
					deleteFoodEntry(entry.id)
					navigate("Tabs", { screen: "Home" })
				},
			},
		)
	}

	if (isPending || isFetching) return <Loading />
	if (error || !data || !data.nutrients) return <ErrorScreen />

	return (
		<FoodInner
			isEditView
			foodName={data.food.name}
			barcode={data.food.barcode}
			nutrients={data.nutrients}
			servings={data.servings}
			onAction={handleEditEntry}
			isLoadingAction={isPendingUpdate || isPendingDelete}
			initialServingData={{
				servingId: entry.serving_id,
				amount: entry.serving_amount,
			}}
			onDelete={handleDeleteEntry}
		/>
	)
}
