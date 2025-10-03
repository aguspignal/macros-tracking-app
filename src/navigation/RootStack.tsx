import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { invalidateQueries } from "../utils/helpers/queriesHelpers"
import { RootStackParams } from "../types/navigation"
import { TabsNavigator } from "./TabsNavigator"
import { useEffect } from "react"
import Loading from "../screens/Loading"
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
					headerShown: route.name === "Tabs" ? false : true,
					headerShadowVisible: false,
				}
			}}
		>
			<Stack.Screen name="Tabs" component={TabsNavigator} />
		</Stack.Navigator>
	)
}
