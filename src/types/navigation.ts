import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { FoodEntryMacros, OpenFoodFactsParsedProduct, TimeOfDay } from "./foods"

export type AuthStackParams = {
	Welcome: undefined
	SignIn: undefined
	SignUp: undefined
}

export type AuthStackScreenProps<T extends keyof AuthStackParams> = NativeStackScreenProps<
	AuthStackParams,
	T
>

export type RootStackParams = {
	Tabs: NavigatorScreenParams<TabParams>
	AddFood: {
		food_id: number
		isScannedProduct: boolean
		offParsedFood?: OpenFoodFactsParsedProduct
		timeOfDay?: TimeOfDay
	}
	EditFoodEntry: {
		entry: FoodEntryMacros
	}
	Settings: undefined
	SearchFood: {
		timeOfDay?: TimeOfDay
	}
	ScanBarcode: {
		timeOfDay: TimeOfDay | undefined
	}
}

export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<
	RootStackParams,
	T
>

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams>

export type TabParams = {
	Home: undefined
	WeightTracking: undefined
	StatsTab: NavigatorScreenParams<StatsTabParams>
}

export type TabScreenProps<T extends keyof TabParams> = BottomTabScreenProps<TabParams, T>

export type StatsTabParams = {
	Stats: undefined
	NutrientsList: undefined
}

export type StatsTabScreenProps<T extends keyof StatsTabParams> = CompositeScreenProps<
	NativeStackScreenProps<StatsTabParams, T>,
	CompositeScreenProps<
		TabScreenProps<keyof TabParams>,
		RootStackScreenProps<keyof RootStackParams>
	>
>
