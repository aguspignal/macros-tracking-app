import { AuthStackParams } from "../../types/navigation"
import { Control, Controller, useController } from "react-hook-form"
import { inputStyles } from "../../resources/styles/inputStyles"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignInFormValues } from "../../types/forms"
import { TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"
import TextButton from "../buttons/TextButton"

type Props = {
	name: keyof SignInFormValues
	control: Control<SignInFormValues>
	forgotPswBtn?: boolean
	navigation?: NativeStackNavigationProp<AuthStackParams, "SignIn">
}

export default function SignInInput({ name, control, forgotPswBtn = false, navigation }: Props) {
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

	function handleForgotPsw() {}

	function handleShowPassword() {
		if (name === "password") setPasswordVisible((prev) => !prev)
	}

	return (
		<View style={inputStyles.inputContainer}>
			<StyledText type="note" style={inputStyles.label}>
				{name === "email" ? "Email" : "Password"}
			</StyledText>

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
				<StyledText type="note" color="danger" style={inputStyles.errorMessage}>
					{fieldState.error.message}
				</StyledText>
			) : null}

			{forgotPswBtn ? (
				<TextButton
					onPress={handleForgotPsw}
					title="Did you forget your password?"
					textType="boldNote"
					color="lighBlue"
					containerStyle={inputStyles.forgotPswBtn}
				/>
			) : null}
		</View>
	)
}
