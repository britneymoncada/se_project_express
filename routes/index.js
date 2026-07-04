import express from "express";

import { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import usersRouter from "./users.js";
import itemsRouter from "./items.js";

import {
  validateCreateUser,
  validateLogin,
} from "../middlewares/validation.js";

import NotFoundError from "../errors/NotFoundError.js";
import { NOT_FOUND_MESSAGE } from "../utils/constants.js";

const router = express.Router();

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);

router.use("/items", itemsRouter);

router.use(auth);
router.use("/users", usersRouter);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

export default router;
