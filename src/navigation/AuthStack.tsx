import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStackParams } from "../types/navigation"
import Welcome from "../screens/Auth/Welcome"
import SignIn from "../screens/Auth/SignIn"
import SignUp from "../screens/Auth/SignUp"

const Stack = createNativeStackNavigator<AuthStackParams>()

export default function AuthNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	)
}
