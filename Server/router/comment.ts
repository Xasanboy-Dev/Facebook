import { Request, Response } from "express";
import { Router } from "express";
import {
  addComment,
  deleteCoomentById,
  getAllComments,
  getAllCoomentsdByPostId,
} from "../Functions/comment";

const router = Router();

router.get("/", getAllComments);

router.delete("/:commentID", deleteCoomentById);

router.get("/:postID", getAllCoomentsdByPostId);

router.post("/:postID", addComment);
module.exports = router;
