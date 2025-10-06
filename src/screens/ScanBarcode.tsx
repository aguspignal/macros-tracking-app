import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera"
import { RootStackScreenProps } from "../types/navigation"
import { StyleSheet, View } from "react-native"
import { theme } from "../resources/theme"
import { useEffect, useState } from "react"
import Button from "../components/buttons/Button"
import Loading from "./Loading"
import StyledText from "../components/texts/StyledText"
import useFoodQuery from "../hooks/useFoodQuery"

export default function ScanBarcode({ navigation, route }: RootStackScreenProps<"ScanBarcode">) {
	const { getProductByBarcodeLazy } = useFoodQuery()
	const [permission, requestPermission] = useCameraPermissions()

	const [scannedBarcode, setScannedBarcode] = useState<string | undefined>(undefined)
	const {
		isFetching,
		isLoading,
		data: scannedProduct,
		refetch: fetchProduct,
	} = getProductByBarcodeLazy(scannedBarcode)

	function handleBarCodeScanned(scanResult: BarcodeScanningResult) {
		setScannedBarcode(scanResult.data)
		fetchProduct()
	}

	useEffect(() => {
		if (scannedProduct) {
			const { product, source } = scannedProduct

			if (source === "db") {
				navigation.replace("AddFood", {
					food_id: product.food.id,
					isScannedProduct: false,
					timeOfDay: route.params.timeOfDay,
				})
			} else {
				navigation.replace("AddFood", {
					food_id: product.id,
					isScannedProduct: true,
					offParsedFood: product,
					timeOfDay: route.params.timeOfDay,
				})
			}
		}
	}, [scannedProduct])

	if (!permission || isFetching || isLoading) return <Loading />

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
