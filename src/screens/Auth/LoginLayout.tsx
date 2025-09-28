import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { ReactNode } from "react"
import { theme } from "../../resources/theme"
import { useHeaderHeight } from "@react-navigation/elements"
import Button from "../../components/buttons/Button"
import StyledText from "../../components/texts/StyledText"
import TextButton from "../../components/TextButton"

type Props = {
	type: "signin" | "signup" | "recovery" | "updatepsw" | "otpcode"
	onSubmit?: () => void
	isLoading?: boolean
	navigation?: NativeStackNavigationProp<ParamListBase, string, undefined>
	children: ReactNode
}

export default function LoginLayout({
	type,
	onSubmit = () => {},
	isLoading,
	children,
	navigation,
}: Props) {
	const headerHeight = useHeaderHeight()

	function handleNavigation() {
		if (navigation) navigation.popTo(type === "signin" ? "SignUp" : "SignIn")
	}

	return (
		<KeyboardAvoidingView
			behavior={undefined}
			keyboardVerticalOffset={headerHeight}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={[
					styles.subcontainer,
					type === "signin" || type === "signup"
						? { justifyContent: "space-between" }
						: null,
				]}
				showsVerticalScrollIndicator={false}
			>
				{type === "otpcode" ? null : (
					<StyledText type="subtitle" style={styles.title}>
						{type === "signin"
							? "Sign In"
							: type === "signup"
							? "Create an account"
							: type === "recovery"
							? "Recover password"
							: "Update your password"}
					</StyledText>
				)}

				{children}

				<Button
					title={
						type === "signin"
							? "Sign In"
							: type === "signup"
							? "Create account"
							: type === "recovery"
							? "Recover password"
							: type === "updatepsw"
							? "Update password"
							: "Verificar"
					}
					onPress={onSubmit}
					isLoading={isLoading}
					size="m"
					style={styles.submitBtn}
				/>

				{type === "signin" || type === "signup" ? (
					<View style={styles.goSignupBtnContainer}>
						<StyledText type="text">
							{type === "signin"
								? "You don't have an account?"
								: "Already have an account?"}
						</StyledText>

						<TextButton
							onPress={handleNavigation}
							title={type === "signin" ? "Sign up" : "Sign in"}
							color="primary"
							size="m"
						/>
					</View>
				) : null}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundLight,
		paddingHorizontal: theme.spacing.l,
	},
	subcontainer: {
		flex: 1,
	},
	title: {
		marginVertical: theme.spacing.m,
	},
	submitBtn: {
		marginVertical: theme.spacing.l,
	},
	goSignupBtnContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: theme.spacing.x4l,
	},
})
