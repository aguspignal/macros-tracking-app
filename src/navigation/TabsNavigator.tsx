import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationStyles } from "../resources/styles/navigationStyles"
import { StatsTabParams, TabParams } from "../types/navigation"
import { theme } from "../resources/theme"
import Home from "../screens/Home"
import HomeHeader from "../components/headers/HomeHeader"
import MCIcon from "../components/icons/MCIcon"
import NutrientsList from "../screens/NutrientsList"
import Stats from "../screens/Stats"
import WeightTracking from "../screens/WeightTracking"

const Tabs = createBottomTabNavigator<TabParams>()
const StatsTabs = createNativeStackNavigator<StatsTabParams>()

export function TabsNavigator() {
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => {
				return {
					headerShadowVisible: false,
					headerShown: route.name !== "StatsTab",
					headerStyle: navigationStyles.headerBackground,
					headerTintColor: theme.colors.textLight,
					tabBarHideOnKeyboard: true,
					tabBarIconStyle: navigationStyles.tabIconContainer,
					tabBarShowLabel: false,
					tabBarStyle: navigationStyles.tabBar,
				}
			}}
		>
			<Tabs.Screen
				name="Home"
				component={Home}
				options={{
					header: ({ navigation }) => <HomeHeader navigation={navigation} />,
					...handleTabOptions("home"),
				}}
			/>
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
		<StatsTabs.Navigator
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: navigationStyles.headerBackground,
				headerTintColor: theme.colors.textLight,
			}}
		>
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
	}
}
