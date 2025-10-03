import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { DatabaseUser } from "../types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FoodEntry } from "../types/foods"

interface UserState {
	user: DatabaseUser | null
	foodEntries: FoodEntry[]
	loadUser: (u: DatabaseUser | null) => void
	loadFoodEntries: (fe: FoodEntry[]) => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: null,
			foodEntries: [],
			loadUser: (u) => set({ user: u }),
			loadFoodEntries: (fe) => set({ foodEntries: fe }),
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
)
