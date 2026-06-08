import { NOT_FOUND_ERROR } from "../utils/constants.js";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

export default NotFoundError;
