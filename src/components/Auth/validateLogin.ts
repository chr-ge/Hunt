import { UserErrors } from "./validateSignup";

export default function validateLogin(values: UserErrors) {
  let errors: UserErrors = {};

  // Email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }
  // Password Errors
  if (!values.password) {
    errors.password = "Your password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Your password must be at least 6 characters.";
  }

  return errors;
}