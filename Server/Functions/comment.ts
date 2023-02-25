import e, { Request, Response } from "express";
import {
  checkCommentExist,
  Comments,
  createComment,
  getAllCommentsByPostID,
  removeComment,
} from "../Database/comment.service";
import {
  addCommentID,
  checkPostExist,
  deleteCommentID,
} from "../Database/post";
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
    if (result) {
      const addCommentToUserBio = await addCommentID(post.id, result.id);
      return res
        .status(201)
        .json({ message: "Added succesfully!", comment: result });
    }
    res.status(500).json({ message: "You have some prolems!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllCoomentsdByPostId(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    const post = await checkPostExist(+postID);
    if (post) {
      const result = await getAllCommentsByPostID(post.id);
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
    const comment = await checkCommentExist(+commentID);
    const user = await CheckUserExist(email!);
    if (user && comment) {
      const deletedComment = await removeComment(comment.id);
      const result = await deleteCommentID(comment.postId, comment.id);
      if (deletedComment && result) {
        return res
          .status(200)
          .json({ message: "Deleted succesfully", deleted: deletedComment });
      }
    }
    res.status(409).json({ message: "You have some problems!" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllComments(req: Request, res: Response) {
  try {
    const comments = await Comments();
    res.status(200).json({ message: "All Comments", comment: comments });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
