export interface Errors {
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  currentPassword?: string;
}

export default function validateSignup(values: Errors) {
  let errors: Errors = {};

  //Name Errors
  if (!values.name) {
    errors.name = "A username is required.";
  }
  // Email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }
  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Your password must be at least 6 characters.";
  }

  return errors;
}
