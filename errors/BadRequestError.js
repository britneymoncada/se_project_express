import { BAD_REQUEST_ERROR } from "../utils/constants.js";

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

export default BadRequestError;
