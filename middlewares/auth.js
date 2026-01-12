/* eslint-disable import/extensions */
import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }

  req.user = payload;
  return next();
}
