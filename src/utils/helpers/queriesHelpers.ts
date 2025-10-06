import { PostgrestError } from "@supabase/supabase-js"
// import ToastNotification from "../../components/notifications/ToastNotification"
import { queryClient } from "../../lib/reactQuery"
import ToastNotification from "../../components/notifications/ToastNotification"

export function notifyIfRequestError(
	response: any | PostgrestError | null,
	notifyIfNull = true,
	message?: string,
) {
	// if (!message) message = i18next.t("error-messages.ups-error-ocurred")
	if (!message) message = "Ups an error ocurred"

	if (notifyIfNull && (response === undefined || response === null))
		ToastNotification({ title: message })
	if (isPostgrestError(response)) ToastNotification({ title: response.code })
}

export function parseSupabaseErrorToTranslation(code: (string & {}) | undefined) {
	return (`supabase-error-codes.${code}` as unknown) as TemplateStringsArray
}

export function invalidateQueries(key: (string | number)[]) {
	queryClient.invalidateQueries({ queryKey: key })
}

export function isPostgrestError(elem: any) {
	return elem instanceof PostgrestError
}

export function notifyPostgrestError(error: PostgrestError) {
	ToastNotification({
		title: error.code,
		description: error.message,
	})
}
