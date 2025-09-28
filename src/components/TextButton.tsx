import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"

type Props = {
	title: string
	onPress: () => void
	color?: keyof typeof theme.colors
	size?: keyof typeof theme.fontSize
	weight?: "bold" | "medium"
	withUnderline?: boolean
	align?: "center" | "justify" | "left" | "right" | "auto"
	icon?: React.ComponentProps<typeof MCIcon>["name"]
	containerStyle?: StyleProp<ViewStyle>
}

export default function TextButton({
	title,
	onPress,
	color = "textDark",
	size = "s",
	weight = "bold",
	withUnderline = false,
	align = "auto",
	icon,
	containerStyle = {},
}: Props) {
	const textStyles: StyleProp<TextStyle> = {
		color: theme.colors[color as keyof typeof theme.colors],
		fontSize: theme.fontSize[size as keyof typeof theme.fontSize],
		fontWeight: weight === "bold" ? "600" : "500",
		textAlign: align,
	}

	const containerStyles: StyleProp<ViewStyle> = {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		borderColor: theme.colors[color as keyof typeof theme.colors],
		borderBottomWidth: withUnderline ? 1 : 0,
	}

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[containerStyles, containerStyle]}
			onPress={onPress}
		>
			{icon ? <MCIcon name={icon} size={size} color={color} /> : null}

			<Text style={textStyles}>{title}</Text>
		</TouchableOpacity>
	)
}
