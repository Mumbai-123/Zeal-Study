import Validator from "validator";
import isEmpty from "is-empty";

function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export default function validateLoginData(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.username)) {
		errors.username = "Username field is required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
