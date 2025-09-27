import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParams } from "../types/navigation"
import { TabsNavigator } from "./TabsNavigator"

const Stack = createNativeStackNavigator<RootStackParams>()

export function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Tabs"
			screenOptions={({ route }) => {
				return {
					headerShown: route.name === "Tabs" ? false : true,
					headerShadowVisible: false,
				}
			}}
		>
			<Stack.Screen name="Tabs" component={TabsNavigator} />
		</Stack.Navigator>
	)
}
