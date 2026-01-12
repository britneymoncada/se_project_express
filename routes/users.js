/* eslint-disable import/extensions */
import express from "express";
import { getUsers, getCurrentUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

export default router;
