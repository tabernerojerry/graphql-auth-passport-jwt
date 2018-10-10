import validator from "validator";
import isEmpty from "./isEmpty";
import pushError from "./pushError";

/**
 *
 * @param {*} errors = errors array
 * @param {*} input = form input
 */
function validateRegisterInput(errors, input) {
  if (validator.isEmpty(input.firstname)) {
    pushError(errors, "firstname", "Firstname is required!");
  }

  if (validator.isEmpty(input.lastname)) {
    pushError(errors, "lastname", "Lastname is required!");
  }

  if (validator.isEmpty(input.email)) {
    pushError(errors, "email", "Email is required!");
  }
  if (!validator.isEmail(input.email) && !isEmpty(input.email)) {
    pushError(errors, "email", "Email is Invalid!");
  }

  if (validator.isEmpty(input.password)) {
    pushError(errors, "password", "Password is required!");
  }
  if (
    !validator.isLength(input.password, { min: 6, max: 30 }) &&
    !isEmpty(input.password)
  ) {
    pushError(errors, "password", "Password must be atleast 6 characters.");
  }

  if (validator.isEmpty(input.confirmPassword)) {
    pushError(errors, "confirmPassword", "Confirm Password is required!");
  }
  if (
    !validator.equals(input.password, input.confirmPassword) &&
    !isEmpty(input.confirmPassword)
  ) {
    pushError(errors, "confirmPassword", "Password does not macth!");
  }

  return {
    isValid: isEmpty(errors) // Boolean
  };
}

export default validateRegisterInput;
