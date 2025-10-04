import { inputStyles } from "../../resources/styles/inputStyles"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"

type Props = {
	value: string | undefined
	setValue: ((text: string) => void) | undefined
	placeholder?: string
	icon?: React.ComponentProps<typeof MCIcon>["name"]
	iconColor?: keyof typeof theme.colors
	onPressIcon?: () => void
	type?: "default" | "numeric" | "email-address"
	style?: StyleProp<ViewStyle>
}

export default function Input({
	value,
	setValue,
	placeholder,
	icon,
	iconColor,
	onPressIcon,
	type = "default",
	style,
}: Props) {
	return (
		<View style={[inputStyles.containerWithIcon, style]}>
			<TextInput
				value={value}
				onChangeText={setValue}
				placeholder={placeholder}
				keyboardType={type}
				style={inputStyles.input}
			/>

			{icon ? (
				<TouchableOpacity
					onPress={onPressIcon}
					activeOpacity={1}
					style={inputStyles.rightIconContainer}
				>
					<MCIcon name={icon} color={iconColor} style={inputStyles.rightIcon} />
				</TouchableOpacity>
			) : null}
		</View>
	)
}
