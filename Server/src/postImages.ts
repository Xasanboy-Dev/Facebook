import { storageForPost, uploadForVideos } from "./../MiddleWares/MiddleWare";
import multer from "multer";
import { Request, Response } from "express";
import { Router } from "express";
import { postPhotoFromUser, postVideoFromUser } from "../Database/image";
const router = Router();
const uploadForImages = multer({ storage: storageForPost });
router.post(
  "/postImages",
  uploadForImages.single("Images"),
  async (req: Request, res: Response) => {
    let email = req.headers.authorization;
    let name = req.file!.originalname;
    let letter = req.headers.accept;
    let type = "Photo";
    res.status(201).json({
      message: "Created",
      Phtots: await postPhotoFromUser(email!, name, type, letter!),
    });
  }
);

const uploadVideos = multer({ storage: uploadForVideos });
router.post(
  "/postVideos",
  uploadVideos.single("Videos"),
  async (req: Request, res: Response) => {
    let email = req.headers.authorization;
    let name = req.file!.originalname;
    let letter = req.headers.accept;
    console.log("Get");
    res.status(201).json({
      message: "Created a new Video",
      Video: await postVideoFromUser(email!, name, letter!),
    });
  }
);
module.exports = router;
