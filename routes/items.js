import express from "express";
import {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} from "../controllers/items.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/items", auth, getItems);
router.post("/items", auth, createItem);
router.delete("/items/:itemId", auth, deleteItem);

router.put("/items/:itemId/likes", auth, likeItem);
router.delete("/items/:itemId/likes", auth, unlikeItem);

export default router;
