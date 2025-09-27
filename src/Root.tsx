import { RootNavigator } from "./navigation/RootStack"
import { Session } from "@supabase/supabase-js"
import { StatusBar } from "expo-status-bar"
import { supabase } from "./lib/supabase"
import { useEffect, useState } from "react"
import AuthNavigator from "./navigation/AuthStack"

export default function Root() {
	const [currentSession, setCurrentSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setCurrentSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setCurrentSession(session)
		})
	}, [])

	return (
		<>
			<StatusBar style="light" />
			{currentSession ? <RootNavigator /> : <AuthNavigator />}
		</>
	)
}
