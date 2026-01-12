import jwt from "jsonwebtoken";

const { JWT_SECRET = "dev-secret" } = process.env;

const generateToken = (userId) =>
  jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });

export default generateToken;
