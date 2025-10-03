import * as yup from "yup"

export const SignInValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
		.required("Required"),
	password: yup.string().required("Required"),
})

export const SignUpValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
		.required("Required"),
	password: yup
		.string()
		.min(6, ({ min }) => `Password must be at least ${min} characters`)
		.required("Required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords don't match")
		.required("Required"),
})
