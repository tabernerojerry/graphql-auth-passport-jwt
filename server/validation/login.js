import validator from "validator";
import isEmpty from "./isEmpty";
import pushError from "./pushError";

const validateLoginInput = (errors, input) => {
  if (validator.isEmpty(input.email)) {
    pushError(errors, "email", "Email is required!");
  }
  if (!validator.isEmail(input.email) && !isEmpty(input.email)) {
    pushError(errors, "email", "Email is Invalid!");
  }

  if (validator.isEmpty(input.password)) {
    pushError(errors, "password", "Password is required!");
  }

  return {
    isValid: isEmpty(errors) // Boolean
  };
};

export default validateLoginInput;
