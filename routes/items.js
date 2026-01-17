import express from "express";
import {
  getItems,
  createItem,
  likeItem,
  unlikeItem,
  deleteItem,
} from "../controllers/items.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);
router.delete("/:itemId", deleteItem);

export default router;
