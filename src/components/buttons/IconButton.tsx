import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"

type Props = {
	icon: React.ComponentProps<typeof MCIcon>["name"]
	onPress: () => void
	size?: "s" | "m"
	color?: keyof typeof theme.colors
	isDisabled?: boolean
	isBordered?: boolean
	isLoading?: boolean
	style?: StyleProp<ViewStyle>
}

export default function IconButton({
	icon,
	onPress,
	size = "m",
	color = "primary",
	isDisabled = false,
	isBordered = false,
	isLoading = false,
	style,
}: Props) {
	const bgColor =
		isDisabled || isLoading
			? theme.colors.grayLight
			: !isBordered
			? theme.colors[color as keyof typeof theme.colors]
			: undefined

	const btnStyles: StyleProp<ViewStyle> = {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: bgColor,
		borderWidth: isBordered ? 1 : 0,
		borderColor: theme.colors[color as keyof typeof theme.colors],
		borderRadius: 80,
		padding: 4,
	}

	const iconColor = isDisabled
		? theme.colors.grayDark
		: isBordered
		? theme.colors[color as keyof typeof theme.colors]
		: theme.colors.textLight

	const iconSize = size === "s" ? theme.fontSize.xxl : theme.fontSize.h3

	const iconStyles: StyleProp<TextStyle> = {
		color: iconColor,
		fontSize: iconSize,
	}

	return isLoading ? (
		<TouchableOpacity activeOpacity={0.7} style={[btnStyles, style]}>
			<ActivityIndicator size="small" />
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[btnStyles, style]}
			onPress={onPress}
			disabled={isDisabled}
		>
			{icon === undefined ? null : <MCIcon name={icon} style={iconStyles} />}
		</TouchableOpacity>
	)
}
