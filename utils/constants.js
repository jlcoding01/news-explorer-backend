const RESPONSE_MESSAGES = {
  ITEM_DELETED: "Item was successfully deleted",
};

const ERROR_MESSAGES = {
  FORBIDDEN: "Request was forbidden!",
  INVALID: "Bad Request! Invalid data passed!",
  NOT_FOUND: "The request was sent to a non-existent address",
  REQUIRED_FILED: "Email or password is required!",
  INCORRECT_CREDENTIALS: "Incorrect email or password",
  CONFLICT: "The email already exists!",
};

module.exports = { RESPONSE_MESSAGES, ERROR_MESSAGES };
