import { StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import Button from "../components/buttons/Button"
import useSession from "../hooks/useSession"

export default function Settings() {
	const { endSession } = useSession()

	function handleLogout() {
		endSession()
	}
	return (
		<View style={styles.container}>
			<Button title="Logout" color="textLight" onPress={handleLogout} isBordered />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: theme.colors.backgroundBlack,
	},
})
