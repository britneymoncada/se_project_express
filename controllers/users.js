import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {
  INVALID_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
} from "../utils/constants.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};

export const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_MESSAGE));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }
      return next(err);
    });
};

export const createUser = (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password || !avatar) {
    return next(new BadRequestError(INVALID_DATA_MESSAGE));
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        avatar,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_MESSAGE));
      }

      if (err.name === "ValidationError") {
        return next(new BadRequestError(INVALID_DATA_MESSAGE));
      }

      return next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );

      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }

      return next(err);
    });
};
