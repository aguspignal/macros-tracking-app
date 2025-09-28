import { Control, Controller, useController } from "react-hook-form"
import { inputStyles } from "../../resources/styles/inputStyles"
import { LoginStackParams } from "../../types/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignInFormValues } from "../../types/forms"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import MCIcon from "../icons/MCIcon"
import TextButton from "../buttons/TextButton"

type Props = {
	name: keyof SignInFormValues
	control: Control<SignInFormValues>
	forgotPswBtn?: boolean
	navigation?: NativeStackNavigationProp<LoginStackParams, "SignIn">
}

export default function SignInInput({ name, control, forgotPswBtn = false, navigation }: Props) {
	const { t } = useTranslation()
	const { field, fieldState } = useController({ name, control })

	const [passwordVisible, setPasswordVisible] = useState(false)

	const iconName: React.ComponentProps<typeof MCIcon>["name"] =
		name === "email" ? "email" : passwordVisible ? "eye-off-outline" : "eye"

	const controllerRules = {
		required: true,
		maxLength: name === "email" ? 64 : 257,
		minLength: name === "email" ? 1 : 6,
		pattern: name === "email" ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i : /.+/,
	}

	function handleForgotPsw() {
		if (navigation) navigation.navigate("PasswordRecovery")
	}

	function handleShowPassword() {
		if (name === "password") setPasswordVisible((prev) => !prev)
	}

	return (
		<View style={inputStyles.inputContainer}>
			<Text style={inputStyles.label}>
				{name === "email" ? t("attributes.email") : t("attributes.password")}
			</Text>

			<Controller
				name={name}
				control={control}
				rules={controllerRules}
				render={() => (
					<View style={inputStyles.containerWithIcon}>
						<TextInput
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							keyboardType={name === "email" ? "email-address" : "default"}
							secureTextEntry={name === "password" && !passwordVisible}
							style={inputStyles.input}
						/>

						<TouchableOpacity
							onPress={handleShowPassword}
							activeOpacity={1}
							style={inputStyles.rightIconContainer}
						>
							<MCIcon name={iconName} style={inputStyles.rightIcon} />
						</TouchableOpacity>
					</View>
				)}
			/>

			{fieldState.error ? (
				<Text style={inputStyles.errorMessage}>{fieldState.error.message}</Text>
			) : null}

			{forgotPswBtn ? (
				<TextButton
					onPress={handleForgotPsw}
					title={t("questions.forgot-password-question")}
					color="secondary"
					size="xs"
					containerStyle={inputStyles.forgotPswBtn}
				/>
			) : null}
		</View>
	)
}
