/* eslint-disable import/extensions */
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_DEV_SECRET = "dev-secret";

export async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hash,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).send(userObj);
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : JWT_DEV_SECRET,
      { expiresIn: "7d" }
    );

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
}
export default getUsers;
