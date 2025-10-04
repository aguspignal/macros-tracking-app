import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { theme } from "../../resources/theme"
import MCIcon from "../icons/MCIcon"
import StyledText from "../texts/StyledText"

type Props = {
	title: string
	onPress: () => void
	size?: "s" | "m" | "l"
	color?: keyof typeof theme.colors
	titleColor?: keyof typeof theme.colors
	icon?: React.ComponentProps<typeof MCIcon>["name"]
	iconDirection?: "left" | "right"
	iconColor?: keyof typeof theme.colors
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
	titleColor = "textDark",
	icon,
	iconDirection = "left",
	iconColor,
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
		: titleColor

	const iconSize =
		size === "s" ? theme.fontSize.l : size === "m" ? theme.fontSize.xl : theme.fontSize.h3

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
		paddingHorizontal: size === "l" ? theme.spacing.l : theme.spacing.m,
		backgroundColor: bgColor,
		borderWidth: isDisabled ? 0 : isBordered ? 1 : 0,
		borderColor: borderColor,
		borderRadius: 80,
		alignSelf: alignSelf ? "center" : "auto",
		gap: theme.spacing.xs,
	}

	const iconStyles: StyleProp<TextStyle> = {
		color: theme.colors[iconColor as keyof typeof theme.colors] ?? textColor,
		fontSize: iconSize,
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
			{iconDirection === "left" && icon !== undefined ? (
				<MCIcon name={icon} style={iconStyles} />
			) : null}

			<StyledText
				type={size === "s" ? "boldNote" : size === "m" ? "boldText" : "subtitle"}
				color={textColor}
			>
				{title}
			</StyledText>

			{iconDirection === "right" && icon !== undefined ? (
				<MCIcon name={icon} style={iconStyles} />
			) : null}
		</TouchableOpacity>
	)
}
