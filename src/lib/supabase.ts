import "react-native-url-polyfill/auto"
import { AppState } from "react-native"
import { createClient } from "@supabase/supabase-js"
import { Database } from "../types/supabase"
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../resources/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh()
	} else {
		supabase.auth.stopAutoRefresh()
	}
})
