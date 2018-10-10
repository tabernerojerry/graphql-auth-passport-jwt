/**
 * Push Error Message to Errors Arrat
 * @arr = errors array
 * @path = form input name
 * @message = error message
 */
export default (arr, path, message) => arr.push({ path, message });
