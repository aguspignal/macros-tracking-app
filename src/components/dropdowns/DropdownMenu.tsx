import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu"
import { ReactNode } from "react"
import { StyleSheet } from "react-native"
import { theme } from "../../resources/theme"

type Option = {
	text: string
	onSelect: () => void
}

type Props = {
	renderTrigger?: ReactNode
	applyFlexToMenuContainer?: boolean
	options: (Option | null)[]
}

export default function DropdownMenu({
	renderTrigger,
	options,
	applyFlexToMenuContainer = false,
}: Props) {
	return (
		<Menu style={applyFlexToMenuContainer ? { flex: 1 } : null}>
			<MenuTrigger>{renderTrigger}</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: styles.optionsContainer,
					optionsWrapper: styles.optionsWrapper,
					optionText: styles.optionText,
				}}
			>
				{options
					.filter((opt) => opt !== null)
					.map((opt) => (
						<MenuOption
							key={opt.text}
							text={opt.text}
							onSelect={opt.onSelect}
							style={styles.optionTouchable}
						/>
					))}
			</MenuOptions>
		</Menu>
	)
}

const styles = StyleSheet.create({
	optionsContainer: {
		marginTop: theme.spacing.xl,
		borderRadius: theme.spacing.xs,
		backgroundColor: theme.colors.backgroundGray,
	},
	optionsWrapper: {
		paddingVertical: theme.spacing.xxs,
		paddingHorizontal: theme.spacing.xxs,
	},
	optionText: {
		fontSize: theme.fontSize.s,
		color: theme.colors.textLight,
	},
	optionTouchable: {
		paddingVertical: theme.spacing.xs,
	},
})
