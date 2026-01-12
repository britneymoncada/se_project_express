import express from "express";
import getUsers, { createUser, login, getUser } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/users", createUser);
router.post("/signin", login);

router.get("/users", auth, getUsers);
router.get("/users/:userId", auth, getUser);

export default router;
