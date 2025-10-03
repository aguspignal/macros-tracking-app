import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	title: string
	onPress: () => void
	size?: "s" | "m"
	color?: keyof typeof theme.colors
	icon?: React.ComponentProps<typeof MCIcon>["name"]
	isDisabled?: boolean
	isBordered?: boolean
	isLoading?: boolean
	alignSelf?: boolean
	style?: StyleProp<ViewStyle>
}

export default function Button({
	title,
	onPress,
	size = "m",
	color = "primary",
	icon,
	isDisabled = false,
	isBordered = false,
	isLoading = false,
	alignSelf = false,
	style,
}: Props) {
	const textColor: keyof typeof theme.colors = isDisabled
		? "grayDark"
		: isBordered
		? color
		: "textDark"

	const iconSize = size === "s" ? theme.fontSize.l : theme.fontSize.xl

	const paddingVertical = size === "s" ? theme.spacing.xxs : theme.spacing.xs

	const bgColor =
		isDisabled || isLoading
			? theme.colors.grayLight
			: !isBordered
			? theme.colors[color as keyof typeof theme.colors]
			: undefined

	const borderColor = isLoading
		? theme.colors.grayLight
		: theme.colors[color as keyof typeof theme.colors]

	const btnStyles: StyleProp<ViewStyle> = {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: paddingVertical,
		paddingHorizontal: theme.spacing.m,
		backgroundColor: bgColor,
		borderWidth: isDisabled ? 0 : isBordered ? 1 : 0,
		borderColor: borderColor,
		borderRadius: 80,
		alignSelf: alignSelf ? "center" : "auto",
	}

	const iconStyles: StyleProp<TextStyle> = {
		color: textColor,
		fontSize: iconSize,
		marginRight: theme.spacing.xxs,
	}

	return isLoading ? (
		<TouchableOpacity activeOpacity={0.8} style={[btnStyles, style]}>
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
			<StyledText type={size === "s" ? "boldNote" : "boldText"} color={textColor}>
				{title}
			</StyledText>
		</TouchableOpacity>
	)
}
