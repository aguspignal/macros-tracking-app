import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationStyles } from "../resources/styles/navigationStyles"
import { StatsTabParams, TabParams } from "../types/navigation"
import Home from "../screens/Home"
import MCIcon from "../components/icons/MCIcon"
import NutrientsList from "../screens/NutrientsList"
import Stats from "../screens/Stats"
import WeightTracking from "../screens/WeightTracking"

const Tabs = createBottomTabNavigator<TabParams>()
const StatsTabs = createNativeStackNavigator<StatsTabParams>()

export function TabsNavigator() {
	return (
		<Tabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: navigationStyles.tabBar,
			}}
		>
			<Tabs.Screen name="Home" component={Home} options={handleTabOptions("home")} />
			<Tabs.Screen
				name="WeightTracking"
				component={WeightTracking}
				options={handleTabOptions("chart-bell-curve")}
			/>
			<Tabs.Screen name="StatsTab" component={StatsTab} options={handleTabOptions("poll")} />
		</Tabs.Navigator>
	)
}

function StatsTab() {
	return (
		<StatsTabs.Navigator>
			<StatsTabs.Screen name="Stats" component={Stats} />
			<StatsTabs.Screen name="NutrientsList" component={NutrientsList} />
		</StatsTabs.Navigator>
	)
}

function handleTabOptions(
	tabIcon: React.ComponentProps<typeof MCIcon>["name"],
): BottomTabNavigationOptions {
	return {
		tabBarIcon: ({ focused }) => (
			<MCIcon
				name={tabIcon}
				style={[navigationStyles.tabIcon, focused ? navigationStyles.tabIconFocused : {}]}
			/>
		),
		tabBarShowLabel: false,
		tabBarIconStyle: navigationStyles.tabIconContainer,
		headerStyle: navigationStyles.headerBackground,
		headerShadowVisible: false,
	}
}
