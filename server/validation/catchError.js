import isEmpty from "./isEmpty";
import pushError from "./pushError";

/**
 * try catch error
 * @param {*} errors = errors Array
 * @param {*} objErrors = DB errors Object
 */
const catchError = (errors, objErrors) => {
  // Unexpected Error Message
  if (isEmpty(objErrors)) {
    pushError(errors, "error", "Something went wrong!");
  }

  // DB Validation Error Message
  for (const error in objErrors) {
    const value = objErrors[error];

    pushError(errors, value.path, value.message);
  }

  return {
    ok: false,
    errors
  };
};

export default catchError;
