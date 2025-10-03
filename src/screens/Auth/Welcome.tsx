import { AuthStackScreenProps } from "../../types/navigation"
import { StyleSheet, View } from "react-native"
import { theme } from "../../resources/theme"
import Button from "../../components/buttons/Button"
import StyledText from "../../components/texts/StyledText"

export default function Welcome({ navigation }: AuthStackScreenProps<"Welcome">) {
	return (
		<View style={styles.container}>
			<StyledText type="title">Welcome</StyledText>

			<View style={styles.btnsContainer}>
				<Button
					onPress={() => navigation.navigate("SignUp")}
					title="Create an account"
					size="m"
				/>

				<Button
					onPress={() => navigation.navigate("SignIn")}
					title="Sign in"
					size="m"
					isBordered
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
		justifyContent: "space-between",
		paddingHorizontal: theme.spacing.l,
		paddingBottom: theme.spacing.x4l,
	},
	btnsContainer: {
		gap: theme.spacing.xl,
	},
})
