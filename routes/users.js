import express from "express";
import {
  getUsers,
  getCurrentUser,
  updateUser,
  getUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.patch("/me", updateUser);

export default router;
