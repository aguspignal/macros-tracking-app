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

export const NutrientsSchema = yup.object().shape({
	calories: numberField(true, "Calories"),
	protein: numberField(true, "Protein"),
	fat: numberField(true, "Fat"),
	saturated_fat: numberField(false),
	monounsaturated_fat: numberField(false),
	polyunsaturated_fat: numberField(false),
	trans_fat: numberField(false),
	carbohydrates: numberField(true, "Carbohydrates"),
	total_sugars: numberField(false),
	added_sugars: numberField(false),
	fiber: numberField(false),
	sodium: numberField(false),
	potassium: numberField(false),
	cholesterol: numberField(false),
})

export const CreateFoodSchema = yup.object({
	name: yup.string().trim().min(2).required("Name is required"),
	servingText: yup.string().trim().required("Serving size is required"),
	servingWeight: numberField(false),
	isGrams: yup.boolean().required(),
	nutrients: NutrientsSchema.required(),
})

function numberField(required: boolean, label?: string) {
	let schema = yup
		.string()
		// .matches(/^-?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/, "Invalid value")
		.test("valid-number-or-empty", "Invalid value", (value) => {
			// allow empty values if not required
			if (!value) return !required
			// validate numeric pattern
			return /^-?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/.test(value)
		})

	if (required) schema = schema.required(label ? `${label} is required` : "Required field")
	// else schema = schema.optional()

	return schema
}

function transformNumber(value: any, originalValue: any) {
	return originalValue === "" || originalValue === null ? null : value
}
