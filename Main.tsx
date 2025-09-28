import { Session } from "@supabase/supabase-js"
import { StatusBar } from "expo-status-bar"
import { supabase } from "./src/lib/supabase"
import { useEffect, useState } from "react"
import AuthNavigator from "./src/navigation/AuthStack"
import Root from "./src/navigation/RootStack"

export default function Main() {
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
			{currentSession ? <Root uuid={currentSession.user.id} /> : <AuthNavigator />}
		</>
	)
}
