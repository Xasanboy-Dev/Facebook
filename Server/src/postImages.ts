import { storageForPost } from "./../MiddleWares/MiddleWare";
import multer from "multer";
import { Request, Response } from "express";
import { Router } from "express";
const router = Router();
const uploadForPosts = multer({ storage: storageForPost });
router.post(
  "/postImages",
  uploadForPosts.single("Images"),
  (req: Request, res: Response) => {
    console.log("Get");
    res.status(201).json({ message: "Creatd!" });
  }
);

module.exports = router;
