import { supabase } from "../lib/supabase"
import { SignInFormValues, SignUpFormValues } from "../types/forms"
// import * as QueryParams from "expo-auth-session/build/QueryParams"

export default function useSession() {
	async function getSession() {
		const { data, error } = await supabase.auth.getSession()

		if (error) throw error
		return data.session
	}

	async function getSessionUser() {
		const { data, error } = await supabase.auth.getUser()

		if (error) throw error
		return data.user
	}

	async function endSession() {
		const { error } = await supabase.auth.signOut()

		if (error) throw error
	}

	async function signUpWithEmail({ email, password }: SignUpFormValues) {
		const { error } = await supabase.auth.signUp({
			email: email.toLowerCase(),
			password: password,
		})

		if (error) {
			console.log(error)
			return error
		}
		return null
	}

	async function signInWithEmail({ email, password }: SignInFormValues) {
		const { error } = await supabase.auth.signInWithPassword({
			email: email.toLowerCase(),
			password: password,
		})

		if (error) {
			// if (error.code === "email_not_confirmed")
			// 	supabase.auth.resend({ type: "signup", email })
			return error
		}
		return null
	}

	async function signInWithGoogle(idToken: any) {
		const { error, data } = await supabase.auth.signInWithIdToken({
			provider: "google",
			token: idToken,
		})
		console.log(error)
		console.log(data)
		if (error) return error
		return null
	}

	// async function resendVerificationEmail(email: string) {
	//     await supabase.auth.resend({ type: "signup", email })
	// }

	// async function setSessionFromUrl(url: string) {
	//     const { params, errorCode } = QueryParams.getQueryParams(url)
	//     if (errorCode) return errorCode

	//     const { access_token, refresh_token } = params

	//     const { error } = await supabase.auth.setSession({ access_token, refresh_token })
	//     if (error) console.log("setsessionfromurl error: ", error)
	//     return null
	// }

	// async function sendRecoverPasswordEmail(email: string) {
	//     const { error } = await supabase.auth.resetPasswordForEmail(email)

	//     if (error) return error
	//     return null
	// }

	// async function updateUserPassword(password: string) {
	//     const { error } = await supabase.auth.updateUser({ password })

	//     if (error) return error
	// }

	// async function verifyOTPCode(email: string, code: string) {
	//     const { error } = await supabase.auth.verifyOtp({
	//         type: "recovery",
	//         email,
	//         token: code,
	//     })

	//     if (error) return error
	//     return null
	// }

	return {
		getSession,
		getSessionUser,
		endSession,
		signUpWithEmail,
		signInWithEmail,
		signInWithGoogle,
	}
}
