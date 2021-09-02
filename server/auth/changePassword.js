import Validator from "validator";
import isEmpty from "is-empty";

function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export default function validatechangePassword(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";
	data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";
  
  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
		errors.password = "New password must be at least 6 characters";
	}

	if (!Validator.equals(data.newPassword, data.newPassword2)) {
		errors.password = "Passwords must match";
  }
  
  if (Validator.equals(data.oldPassword, data.newPassword)) {
		errors.password = "New password can't be equal to old password";
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = "Username field is required";
	}

	if (Validator.isEmpty(data.oldPassword)) {
		errors.password = "Old password field is required";
  }
  
  if (Validator.isEmpty(data.newPassword)) {
		errors.password = "New password field is required";
	}
  
  if (Validator.isEmpty(data.newPassword2)) {
		errors.password = "Confirm new password field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
