import { storageForPost, uploadForVideos } from "../MiddleWares/MiddleWare";
import multer from "multer";
import { Request, Response } from "express";
import { Router } from "express";
import { postPhotoFromUser, postVideoFromUser } from "../Database/image";
import { CheckUserExist } from "../Database/user";
import {
  addDislikee,
  addLike,
  checkPostExist,
  checkUserLikedOrDisliked,
  deleteDislike,
  deleteLikee,
} from "../Database/post";
import { savePost_Or_Unsave } from "../Functions/Posts";
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
    const { PostsId } = req.params;
    const { email } = req.body;
    const existUser = await CheckUserExist(email);
    const existPost = await checkPostExist(+PostsId);
    if (!existPost || !existUser) {
      return res.status(500).json({ message: "You have some problems!" });
    }
    const result = await checkUserLikedOrDisliked(existUser.id, existPost.id);
    if (result == "LIKED") {
      const deletedLiking = await deleteLikee(existUser.id, existPost.id);
      if (!deletedLiking) {
        return res.status(500).json({ message: "You have some problems!" });
      }
      return res.status(200);
    } else if (result == "DISLIKED") {
      const addingLike = await addLike(existUser.id, existPost.id);
      if (!addingLike) {
        return res.status(500).json({ message: "You have some problems!" });
      }
      res.status(200).json({ message: "Added succesfully!" });
    } else {
      const added = await addLike(existUser.id, existPost.id);
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal error!" });
  }
});

router.post("/dislikee/:PostsId", async (req: Request, res: Response) => {
  try {
    const { PostsId } = req.params;
    const { email } = req.body;

    const existUser = await CheckUserExist(email);
    const existPost = await checkPostExist(+PostsId);
    if (!existPost || !existUser) {
      return res.status(500).json({ message: "You have some problems!" });
    }
    const result = await checkUserLikedOrDisliked(existUser.id, existPost.id);
    if (result == "DISLIKED") {
      const removeDelete = await deleteDislike(existUser.id, existPost.id);
      if (!removeDelete) {
        return res.status(409).json({ message: "You have some problems!" });
      }
      return res.status(200).json({ message: "Deleted succesfully!" });
    } else if (result == "LIKED") {
      const removeLike = await deleteLikee(existUser.id, existPost.id);
      if (!removeLike) {
        return res.status(409).json({ message: "You have some problems!" });
      }
      await addDislikee(existUser.id, existPost.id);
      return res.status(200).json({ message: "Added succesfully" });
    } else {
      const result = await addDislikee(existUser.id, existPost.id);
      res.status(200).json({ message: "Added succesfully!" });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal error" });
  }
});

router.post("/checkSaved/:postId", savePost_Or_Unsave);

module.exports = router;
