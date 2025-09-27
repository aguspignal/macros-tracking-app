import { StyleProp, Text, TextStyle } from "react-native"
import { theme } from "../../resources/theme"

type Props = {
	type: "note" | "text" | "subtitle" | "title"
	color?: keyof typeof theme.colors
	style?: StyleProp<TextStyle>
	children: React.ReactNode
}
export default function StyledText({ type, color = "textLight", style, children }: Props) {
	const fontSize =
		type === "note"
			? theme.fontSize.xs
			: type === "text"
			? theme.fontSize.s
			: type === "subtitle"
			? theme.fontSize.l
			: theme.fontSize.xxl

	const fontWeight = type === "subtitle" || type === "title" ? "600" : "500"

	const textStyle: StyleProp<TextStyle> = {
		fontSize,
		fontWeight,
		color: theme.colors[color as keyof typeof theme.colors],
	}

	return <Text style={[textStyle, style]}>{children}</Text>
}
