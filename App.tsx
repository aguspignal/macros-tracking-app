import { GestureHandlerRootView } from "react-native-gesture-handler"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { queryClient } from "./src/lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import Root from "./src/Root"

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider style={{ marginBottom: initialWindowMetrics?.insets.bottom }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer>
						<Root />
					</NavigationContainer>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}
