import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { DatabaseUser } from "../types/user"
import { FoodEntryMacros } from "../types/foods"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface UserState {
	user: DatabaseUser | null
	foodEntries: FoodEntryMacros[]

	loadUser: (u: DatabaseUser | null) => void
	loadFoodEntries: (fe: FoodEntryMacros[]) => void

	addOrUpdateFoodEntry: (fe: FoodEntryMacros) => void

	deleteFoodEntry: (feId: number) => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: null,
			foodEntries: [],
			loadUser: (u) => set({ user: u }),
			loadFoodEntries: (fe) => set({ foodEntries: fe }),
			addOrUpdateFoodEntry: (fe) =>
				set({
					foodEntries: get()
						.foodEntries.filter((entry) => entry.entry.id !== fe.entry.id)
						.concat(fe),
				}),
			deleteFoodEntry: (feId) =>
				set({ foodEntries: get().foodEntries.filter((entry) => entry.entry.id !== feId) }),
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
)
