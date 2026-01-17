import jwt from "jsonwebtoken";
import {
  UNAUTHORIZED_ERROR,
  AUTH_REQUIRED_MESSAGE,
} from "../utils/constants.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: AUTH_REQUIRED_MESSAGE });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: AUTH_REQUIRED_MESSAGE });
  }

  req.user = payload;
  return next();
}
