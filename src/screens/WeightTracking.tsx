import { StyleSheet, Text, View } from "react-native"
import { theme } from "../resources/theme"

export default function WeightTracking() {
	return (
		<View style={styles.container}>
			<Text>Bw tracking</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
	},
})
