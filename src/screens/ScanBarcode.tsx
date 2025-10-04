import { StyleSheet, View } from "react-native"
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera"
import { RootStackScreenProps } from "../types/navigation"
import { theme } from "../resources/theme"
import Button from "../components/buttons/Button"
import Loading from "./Loading"
import StyledText from "../components/texts/StyledText"
import useFoodQuery from "../hooks/useFoodQuery"
import { useEffect, useState } from "react"
import { FoodServingsNutrients } from "../types/foods"

export default function ScanBarcode({ navigation, route }: RootStackScreenProps<"ScanBarcode">) {
	const { getProductByBarcodeLazy } = useFoodQuery()
	const [permission, requestPermission] = useCameraPermissions()

	const [scannedBarcode, setScannedBarcode] = useState<string | undefined>(undefined)
	const { isPending, data: fetchedProduct, refetch: fetchProduct } = getProductByBarcodeLazy(
		scannedBarcode,
	)

	function handleBarCodeScanned(scanResult: BarcodeScanningResult) {
		console.log(scanResult.data)
		setScannedBarcode(scanResult.data)
		fetchProduct()
	}

	useEffect(() => {
		if (fetchedProduct) {
			const { serving, nutrients, ...rest } = fetchedProduct
			const food: FoodServingsNutrients = {
				food: rest,
				servings: serving ? [serving] : [],
				nutrients: {
					id: -1,
					food_id: -1,
					...nutrients,
				},
			}

			navigation.replace("Food", { food, timeOfDay: route.params?.timeOfDay })
		}
	}, [fetchedProduct])

	if (!permission) return <Loading />

	if (!permission.granted)
		return (
			<View style={styles.container}>
				<View style={styles.grantPermissionContainer}>
					<StyledText type="text">We need your permission to show the camera</StyledText>

					<Button onPress={requestPermission} title="Grant permission" />
				</View>
			</View>
		)

	return (
		<View style={styles.container}>
			<CameraView
				onBarcodeScanned={handleBarCodeScanned}
				facing="back"
				style={styles.camera}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.backgroundBlack,
	},
	grantPermissionContainer: {
		gap: theme.spacing.s,
		alignItems: "center",
	},
	camera: {
		flex: 1,
	},
})
