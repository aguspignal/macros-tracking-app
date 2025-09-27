import { Dimensions } from "react-native"
import Constants from "expo-constants"

// =============================================================================
// DEVICE & LAYOUT
// =============================================================================

const screenDimensions = Dimensions.get("screen")
const windowDimensions = Dimensions.get("window")

export const [SCREEN_WIDTH, SCREEN_HEIGHT] = [screenDimensions.width, screenDimensions.height]
export const [WINDOW_WIDTH, WINDOW_HEIGHT] = [windowDimensions.width, windowDimensions.height]
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight

// =============================================================================
// KEYS
// =============================================================================

export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_3BWgbta6u_Fg39SUrPGV2Q_lZGWLOXx"

// =============================================================================
// URLS
// =============================================================================

export const SUPABASE_URL = "https://tkgpzqltyphafnwbusmc.supabase.co"
