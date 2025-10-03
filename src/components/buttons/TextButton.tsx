import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { TextType } from "../../types/misc"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	title: string
	onPress: () => void
	textType?: TextType
	color?: keyof typeof theme.colors
	withUnderline?: boolean
	align?: "center" | "justify" | "left" | "right" | "auto"
	icon?: React.ComponentProps<typeof MCIcon>["name"]
	containerStyle?: StyleProp<ViewStyle>
}

export default function TextButton({
	title,
	onPress,
	textType = "text",
	color = "textLight",
	withUnderline = false,
	align = "auto",
	icon,
	containerStyle = {},
}: Props) {
	const textStyles: StyleProp<TextStyle> = {
		textAlign: align,
	}

	const containerStyles: StyleProp<ViewStyle> = {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		borderColor: theme.colors[color as keyof typeof theme.colors],
		borderBottomWidth: withUnderline ? 1 : 0,
	}

	const iconSize: keyof typeof theme.fontSize =
		textType === "note" ? "l" : textType === "text" || textType === "boldText" ? "xl" : "xxl"

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[containerStyles, containerStyle]}
			onPress={onPress}
		>
			{icon ? <MCIcon name={icon} size={iconSize} color={color} /> : null}

			<StyledText type={textType} color={color} style={textStyles}>
				{title}
			</StyledText>
		</TouchableOpacity>
	)
}
