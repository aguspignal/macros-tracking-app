import { AuthStackScreenProps } from "../../types/navigation"
import { StyleSheet, View, Image } from "react-native"
import { theme } from "../../resources/theme"
import Button from "../../components/buttons/Button"

export default function Welcome({ navigation }: AuthStackScreenProps<"Welcome">) {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../../../assets/images/logos/f_logo.png")}
			/>

			<View style={styles.subcontainer}>
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundLight,
		alignItems: "center",
		justifyContent: "space-between",
	},
	subcontainer: {
		alignItems: "center",
		gap: theme.spacing.xxl,
	},
	image: {
		width: 240,
		height: 240,
	},
	politicsContainer: {
		margin: theme.spacing.xl,
	},
	politics: {
		fontSize: theme.fontSize.xxs,
		textAlign: "center",
		color: theme.colors.grayDark,
	},
	greenText: {
		color: theme.colors.darkGreen,
		fontWeight: "600",
	},
	btnsContainer: {
		gap: theme.spacing.s,
		alignSelf: "stretch",
		paddingHorizontal: theme.spacing.xl,
	},
})
