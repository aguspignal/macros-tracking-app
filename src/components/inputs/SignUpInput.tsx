import { Control, Controller, useController } from "react-hook-form"
import { inputStyles } from "../../resources/styles/inputStyles"
import { SignUpFormValues } from "../../types/forms"
import { TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	name: keyof SignUpFormValues
	control: Control<SignUpFormValues>
}

export default function SignUpInput({ name, control }: Props) {
	const { field, fieldState } = useController({ name, control })

	const [passwordVisible, setPasswordVisible] = useState(false)

	const label = name === "email" ? "Email" : name === "password" ? "Password" : "Confirm password"

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
			<StyledText type="note" style={inputStyles.label}>
				{label}
			</StyledText>

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
				<StyledText type="note" color="danger" style={inputStyles.errorMessage}>
					{fieldState.error.message}
				</StyledText>
			) : null}
		</View>
	)
}
