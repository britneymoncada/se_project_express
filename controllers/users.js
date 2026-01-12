import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { NotFoundError } from "../utils/errors.js";

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

export async function getUser(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid user id" });
    }
    return next(err);
  }
}

export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send(user);
    })
    .catch(next);
};

export async function createUser(req, res, next) {
  try {
    const { name, avatar } = req.body;

    const user = await User.create({
      name,
      avatar,
    });

    return res.status(201).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid user data" });
    }

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
