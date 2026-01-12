/* eslint-disable max-classes-per-file */

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
