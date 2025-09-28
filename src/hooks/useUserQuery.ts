import { DatabaseUser } from "../types/user"
import { isPostgrestError } from "../utils/helpers/queriesHelpers"
import { PostgrestError } from "@supabase/supabase-js"
import { useQuery } from "@tanstack/react-query"
import ToastNotification from "../components/notifications/ToastNotification"
import userService from "../services/userService"

const QUERYKEY_ROOT = "user"
export const GETINITIALDATA_KEY = (uuid: string) => [QUERYKEY_ROOT, "getbyuuid", uuid]

export default function useUserQuery() {
	function getUserInitialData(uuid: string | undefined) {
		return useQuery<DatabaseUser | null>({
			queryKey: GETINITIALDATA_KEY(uuid ?? ""),
			queryFn: async () => {
				if (!uuid) return null
				const result = await userService.fetchUserByUuid(uuid)

				if (isPostgrestError(result)) {
					handlePostgrestError(result)
					return null
				}

				return result
			},
		})
	}

	return {
		getUserInitialData,
	}
}

function handlePostgrestError(error: PostgrestError) {
	ToastNotification({
		title: error.code,
		description: error.message,
	})
}
