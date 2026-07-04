import express from "express";
import { getCurrentUser, updateUser } from "../controllers/users.js";
import { validateUpdateUser } from "../middlewares/validation.js";

const router = express.Router();

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUser, updateUser);

export default router;
