import { AuthStackParams } from "../types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationStyles } from "../resources/styles/navigationStyles"
import { theme } from "../resources/theme"
import SignIn from "../screens/Auth/SignIn"
import SignUp from "../screens/Auth/SignUp"
import Welcome from "../screens/Auth/Welcome"

const Stack = createNativeStackNavigator<AuthStackParams>()

export default function AuthNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: navigationStyles.headerBackground,
				headerTitleStyle: navigationStyles.headerTitle,
				headerTintColor: theme.colors.textLight,
				headerShadowVisible: false,
				headerTitle: "",
			}}
		>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	)
}
