import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { invalidateQueries } from "../utils/helpers/queriesHelpers"
import { navigationStyles } from "../resources/styles/navigationStyles"
import { RootStackParams } from "../types/navigation"
import { TabsNavigator } from "./TabsNavigator"
import { theme } from "../resources/theme"
import { useEffect } from "react"
import Loading from "../screens/Loading"
import SearchFood from "../screens/SearchFood"
import SearchFoodHeader from "../components/headers/SearchFoodHeader"
import Settings from "../screens/Settings"
import useUserQuery, { GETINITIALDATA_KEY } from "../hooks/useUserQuery"

const Stack = createNativeStackNavigator<RootStackParams>()

type Props = {
	uuid: string
}
export default function Root({ uuid }: Props) {
	const { getUserInitialData } = useUserQuery()
	const { isPending, isLoading, isFetching, data } = getUserInitialData(uuid)

	useEffect(() => {
		invalidateQueries(GETINITIALDATA_KEY(uuid))
	}, [uuid])

	useEffect(() => {
		console.log(data)
	}, [data])

	return isPending || isLoading || isFetching ? <Loading /> : <RootNavigator />
}

function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Tabs"
			screenOptions={({ route }) => {
				return {
					headerStyle: navigationStyles.headerBackground,
					headerTintColor: theme.colors.textLight,
					headerShown: route.name === "Tabs" ? false : true,
					headerShadowVisible: false,
				}
			}}
		>
			<Stack.Screen name="Tabs" component={TabsNavigator} />
			<Stack.Screen
				name="SearchFood"
				component={SearchFood}
				options={{
					header: ({ navigation, route, back }) => (
						<SearchFoodHeader navigation={navigation} route={route} back={back} />
					),
				}}
			/>
			<Stack.Screen name="Settings" component={Settings} />
		</Stack.Navigator>
	)
}
