import { StyleProp, Text, TextStyle } from "react-native"
import { TextType } from "../../types/misc"
import { theme } from "../../resources/theme"

type Props = {
	type: TextType
	color?: keyof typeof theme.colors
	align?: "center" | "left" | "right"
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}
export default function StyledText({
	type,
	color = "textLight",
	align = "left",
	style,
	children,
}: Props) {
	const fontSize =
		type === "note" || type === "boldNote"
			? theme.fontSize.xs
			: type === "text" || type === "boldText"
			? theme.fontSize.s
			: type === "subtitle"
			? theme.fontSize.l
			: theme.fontSize.xxl

	const fontWeight = type === "note" || type === "text" ? "500" : "600"

	const textStyle: StyleProp<TextStyle> = {
		fontSize,
		fontWeight,
		textAlign: align,
		color: theme.colors[color as keyof typeof theme.colors],
	}

	return <Text style={[textStyle, style]}>{children}</Text>
}
