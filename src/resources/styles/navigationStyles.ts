import { StyleSheet } from "react-native"
import { theme } from "../theme"

export const navigationStyles = StyleSheet.create({
	headerTitle: {
		fontSize: theme.fontSize.l,
		color: theme.colors.textLight,
	},
	headerBackground: {
		backgroundColor: theme.colors.backgroundBlack,
	},
	headerImage: {
		width: theme.fontSize.h1,
		height: theme.fontSize.h1,
	},
	headerIcon: {
		fontSize: theme.fontSize.h3,
		color: theme.colors.textLight,
		marginLeft: theme.spacing.m,
	},
	headerRightContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: theme.spacing.s,
	},
	tabBar: {
		height: theme.spacing.x3l + 4,
		backgroundColor: theme.colors.backgroundDark,
	},
	tabIconContainer: {
		width: theme.fontSize.h3 + 4,
		height: theme.fontSize.h3 + 4,
		marginTop: 4,
	},
	tabIcon: {
		fontSize: theme.fontSize.h3 + 4,
		color: theme.colors.textLight,
	},
	tabIconFocused: {
		color: theme.colors.primary,
	},
})
