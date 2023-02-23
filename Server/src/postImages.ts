import { storageForPost, uploadForVideos } from "./../MiddleWares/MiddleWare";
import multer from "multer";
import { Request, Response } from "express";
import { Router } from "express";
import { postPhotoFromUser, postVideoFromUser } from "../Database/image";
import { addDIsLikee, addLikee, checkPostExist } from "../Database/post";
import { CheckUserExist } from "../Database/user";
import { user } from "@prisma/client";
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

router.post("/likee/:PostsId", async (req: Request, res: Response) => {
  try {
    console.log("POst likee");
    let { PostsId } = req.params;
    let { email } = req.body;
    const userExist: user | false | null = await CheckUserExist(email);
    const existPost = await checkPostExist(+PostsId);
    if (!userExist || !existPost) {
      return res.status(400).json({ message: "Post not Found!" });
    }
    const result: any = await addLikee(userExist.id, +PostsId);
    if (!result) {
      return res
        .status(200)
        .json({ message: "You have already liked!", post: result[1] });
    }
    res.status(200).json({ message: "Liked!", post: result });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Error" });
  }
});

router.post("/dislikee/:PostsId", async (req: Request, res: Response) => {
  try {
    let { PostsId } = req.params;
    let { email } = req.body;
    const userExist: user | false | null = await CheckUserExist(email);
    const existPost = await checkPostExist(+PostsId);
    if (!userExist || !existPost) {
      return res.status(400).json({ message: "Post not Found!" });
    }
    const result: any = await addDIsLikee(userExist.id, +PostsId);
    if (!result) {
      return res
        .status(200)
        .json({ message: "You have already disliked!", post: result[1] });
    }
    res.status(200).json({ message: "Liked!", post: result });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Error" });
  }
});
module.exports = router;
