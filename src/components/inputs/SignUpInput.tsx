import { Control, Controller, useController } from "react-hook-form"
import { inputStyles } from "../../resources/styles/inputStyles"
import { SignUpFormValues } from "../../types/forms"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import MCIcon from "../icons/MCIcon"

type Props = {
	name: keyof SignUpFormValues
	control: Control<SignUpFormValues>
}

export default function SignUpInput({ name, control }: Props) {
	const { t } = useTranslation()
	const { field, fieldState } = useController({ name, control })

	const [passwordVisible, setPasswordVisible] = useState(false)

	const label =
		name === "email"
			? t("attributes.email")
			: name === "password"
			? t("attributes.password")
			: t("actions.confirm-password")

	const iconName: React.ComponentProps<typeof MCIcon>["name"] =
		name === "email" ? "email" : passwordVisible ? "eye-off-outline" : "eye"

	const controllerRules = {
		required: true,
		maxLength: name === "email" ? 64 : 257,
		minLength: name === "password" || name === "confirmPassword" ? 6 : 1,
		pattern: name === "email" ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i : /.+/,
	}

	function handleShowPassword() {
		if (name === "password" || name === "confirmPassword") setPasswordVisible((prev) => !prev)
	}

	return (
		<View style={inputStyles.inputContainer}>
			<Text style={inputStyles.label}>{label}</Text>

			<Controller
				name={name}
				control={control}
				rules={controllerRules}
				render={() => (
					<View>
						<TextInput
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							keyboardType={name === "email" ? "email-address" : "default"}
							secureTextEntry={
								(name === "password" || name === "confirmPassword") &&
								!passwordVisible
							}
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
		</View>
	)
}
