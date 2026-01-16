/* eslint-disable import/extensions */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  INVALID_DATA_MESSAGE,
  NOT_FOUND_MESSAGE,
} from "../utils/constants.js";

const { NODE_ENV, JWT_SECRET } = process.env;

// GET /users
export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET /users/me
export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: INVALID_DATA_MESSAGE });
      }
      return next(err);
    });
};

// PATCH /users/me
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
        return res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: INVALID_DATA_MESSAGE });
      }
      return next(err);
    });
};

// POST /signup
export const createUser = (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  // Simple presence check
  if (!name || !email || !password || !avatar) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: INVALID_DATA_MESSAGE });
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
        // Duplicate email → still must use 400 Invalid data per reviewer instructions
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: INVALID_DATA_MESSAGE });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: INVALID_DATA_MESSAGE });
      }

      return next(err);
    });
};

// POST /signin
export const login = (req, res, next) => {
  const { email, password } = req.body;

  // Missing fields = 400 Invalid data
  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: INVALID_DATA_MESSAGE });
  }

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(UNAUTHORIZED_ERROR)
          .send({ message: "Incorrect email or password" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(UNAUTHORIZED_ERROR)
            .send({ message: "Incorrect email or password" });
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );

        return res.send({ token });
      });
    })
    .catch(next);
};
