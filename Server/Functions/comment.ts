import e, { Request, Response } from "express";
import {
  checkCommentExist,
  createComment,
  getAllCommentsByPostID,
} from "../Database/comment.service";
import { checkPostExist } from "../Database/post";
import { CheckUserExist } from "../Database/user";

export async function addComment(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    const { email, letter } = req.body;
    const user = await CheckUserExist(email);
    const post = await checkPostExist(+postID);

    if (!post || !user) {
      return res.status(409).json({ message: "Please check your message!" });
    }
    const result = await createComment(post.id, user.email, letter);
    res.status(201).json({ message: "Added succesfully!", comment: result });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllCoomentsdByPostId(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    const email = req.headers.authorization;
    const user = await CheckUserExist(email!);
    const post = await checkPostExist(+postID);
    if (user && post) {
      const result = await getAllCommentsByPostID(post.id, user.email);
      res.status(200).json({
        message: `All comments by ${postID} comment!`,
        comment: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteCoomentById(req: Request, res: Response) {
  try {
    const { commentID } = req.params;
    const email = req.headers.authorization;
    if (email && commentID) {
      const comment = await checkCommentExist(+commentID);
      const user = await CheckUserExist(email!);
    }
    res.status(409).json({ message: "You have some problems!" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}
