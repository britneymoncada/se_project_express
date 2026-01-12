/* eslint-disable import/extensions */
import express from "express";
import getUsers, { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/users", createUser);
router.post("/signin", login);

router.get("/users", auth, getUsers);

export default router;
