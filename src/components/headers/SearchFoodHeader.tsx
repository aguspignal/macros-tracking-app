import { Header } from "@react-navigation/elements"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { navigationStyles } from "../../resources/styles/navigationStyles"
import { ParamListBase, Route, RouteProp, useNavigation } from "@react-navigation/native"
import { RootStackNavigationProp, RootStackParams } from "../../types/navigation"
import { TouchableOpacity } from "react-native"
import MCIcon from "../icons/MCIcon"
import { theme } from "../../resources/theme"

type Props = {
	navigation: NativeStackNavigationProp<ParamListBase, string, undefined>
	route: Route<string>
	back?: {
		title: string | undefined
		href: string | undefined
	}
}
export default function SearchFoodHeader({ navigation, route, back }: Props) {
	const timeOfDay = (route as RouteProp<RootStackParams, "SearchFood"> | undefined)?.params
		?.timeOfDay

	return (
		<Header
			title={timeOfDay ? `Add to ${timeOfDay}` : "Add food"}
			headerTintColor={theme.colors.textLight}
			headerTitleStyle={navigationStyles.headerTitle}
			headerStyle={navigationStyles.headerBackground}
			headerRight={() => <HeaderRight navigation={navigation} />}
			headerShadowVisible={false}
			back={back}
		/>
	)
}

type HeaderRightProps = {
	navigation: NativeStackNavigationProp<ParamListBase, string, undefined>
}
function HeaderRight({ navigation }: HeaderRightProps) {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("CreateFood")}
			style={navigationStyles.headerRightContainer}
		>
			<MCIcon name="hamburger-plus" style={navigationStyles.headerIcon} />
		</TouchableOpacity>
	)
}
