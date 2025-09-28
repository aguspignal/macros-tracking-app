import * as yup from "yup"

export const SignInValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email invalido")
		.required("Requerido"),
	password: yup.string().required("Requerido"),
})

export const SignUpValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email invalido")
		.required("Requerido"),
	password: yup
		.string()
		.min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
		.required("Requerido"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Las contraseñas no coinciden")
		.required("Requerido"),
})
