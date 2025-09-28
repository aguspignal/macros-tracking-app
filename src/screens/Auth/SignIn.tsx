import { AuthStackScreenProps } from "../../types/navigation"
import { SignInFormValues } from "../../types/forms"
import { SignInValidationSchema } from "../../utils/validationSchemas"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import LoginLayout from "./LoginLayout"
import SignInInput from "../../components/inputs/SignInInput"
import ToastNotification from "../../components/notifications/ToastNotification"
import useSession from "../../hooks/useSession"

export default function SignIn({ navigation }: AuthStackScreenProps<"SignIn">) {
	const { signInWithEmail } = useSession()

	const {
		handleSubmit,
		control,
		formState: { isLoading, isSubmitting },
	} = useForm<SignInFormValues>({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(SignInValidationSchema),
	})

	async function handleSignIn(values: SignInFormValues) {
		const error = await signInWithEmail(values)

		if (error) {
			// if (error.code === "email_not_confirmed") {
			// 	navigation.navigate("EmailVerification", { email: values.email })
			// 	return
			// }
			console.log(error)
			ToastNotification({ title: error.code })
		}
	}

	return (
		<LoginLayout
			type="signin"
			onSubmit={handleSubmit(handleSignIn)}
			isLoading={isLoading || isSubmitting}
			navigation={navigation}
		>
			<SignInInput name="email" control={control} />
			<SignInInput
				name="password"
				control={control}
				forgotPswBtn={true}
				navigation={navigation}
			/>
		</LoginLayout>
	)
}
