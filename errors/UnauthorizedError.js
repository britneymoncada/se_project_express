import { UNAUTHORIZED_ERROR } from "../utils/constants.js";

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR;
  }
}

export default UnauthorizedError;
