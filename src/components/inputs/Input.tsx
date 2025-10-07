import { inputStyles } from "../../resources/styles/inputStyles"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	value: string | undefined
	setValue: ((text: string) => void) | undefined
	placeholder?: string

	label?: string
	labelActionText?: string
	labelActionIcon?: React.ComponentProps<typeof MCIcon>["name"]
	labelAction?: () => void

	icon?: React.ComponentProps<typeof MCIcon>["name"]
	iconColor?: keyof typeof theme.colors
	onPressIcon?: () => void

	errorMessage?: string

	type?: "default" | "numeric" | "email-address"
	isOptional?: boolean
	style?: StyleProp<ViewStyle>
}

export default function Input({
	value,
	setValue,
	placeholder,
	label,
	labelAction,
	labelActionIcon,
	labelActionText,
	icon,
	iconColor,
	onPressIcon,
	errorMessage,
	type = "default",
	isOptional = false,
	style,
}: Props) {
	return (
		<View style={[inputStyles.containerWithIcon, style]}>
			<View style={inputStyles.labelAndActionContainer}>
				{label ? (
					<View style={inputStyles.labelIconAndText}>
						<StyledText type="boldNote">{label}</StyledText>
						{isOptional ? (
							<StyledText type="note" color="grayDark">
								(optional)
							</StyledText>
						) : null}
					</View>
				) : null}

				{labelAction ? (
					<TouchableOpacity
						onPress={labelAction}
						style={inputStyles.labelIconAndText}
						activeOpacity={0.7}
					>
						{labelActionIcon ? <MCIcon name={labelActionIcon} /> : null}

						<StyledText type="boldNote">{labelActionText}</StyledText>
					</TouchableOpacity>
				) : null}
			</View>

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

			{errorMessage ? (
				<StyledText type="note" color="danger">
					{errorMessage}
				</StyledText>
			) : null}
		</View>
	)
}
