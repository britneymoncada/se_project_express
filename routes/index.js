import express from "express";
import { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import usersRouter from "./users.js";
import itemsRouter from "./items.js";

import {
  validateCreateUser,
  validateLogin,
} from "../middlewares/validation.js";

const router = express.Router();

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);

router.use("/items", itemsRouter);

router.use(auth);

router.use("/users", usersRouter);

export default router;
