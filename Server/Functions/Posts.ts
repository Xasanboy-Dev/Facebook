import { Request, Response } from "express";
import { CheckUserExist } from "../Database/user";
import {
  checkPostExist,
  deleteWithId,
  GetPosts,
  getPosts_WhereLikeMore,
  postText,
  removerPostById,
} from "./../Database/post";
export async function GetAllPostsByUserEmail(req: Request, res: Response) {
  try {
    let { email } = req.params;
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Interal error" });
  }
}

export async function creaetNewPost(req: Request, res: Response) {
  try {
    const { email, letter, img, video } = req.body;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function GetAllPosts(req: Request, res: Response) {
  try {
    const posts = await GetPosts();
    res.status(200).json({ message: "Posts", POSTS: posts });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function removePostById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ message: "Deleted!", deletedPost: await removerPostById(+id) });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Intrenal error" });
  }
}

export async function postLetter(req: Request, res: Response) {
  try {
    let { letter, email } = req.body;
    let userExist = await CheckUserExist(email);
    if (!userExist) {
      return res.status(500).json({ message: "You must login please!" });
    }
    const postLetter = await postText(letter, email);
    return res
      .status(201)
      .json({ message: "Added succesfully", post: postLetter });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function deletePostById(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let { email } = req.body;
    let checkedEmail = await CheckUserExist(email);
    if (!checkedEmail) {
      return res.status(400).json({ message: "You must register!" });
    }
    let checkedPost = checkPostExist(+id);
    if (!checkedPost) {
      return res.status(400).json({
        message: "Your posts isn't exist. Please check and try again!",
      });
    }
    const deletedPost = await deleteWithId(+id);
    res.status(200).json({ message: "Deleted succesfully", post: deletedPost });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Error" });
  }
}

export async function allPostsWithoutFilter_InOreder(
  req: Request,
  res: Response
) {
  try {
    let email = req.headers.authorization;
    let user = await CheckUserExist(email!);
    if (!user) {
      return res.status(400).json({ message: "You  must login!" });
    }
    res.status(200).json({
      message: "Posts in order",
      posts: await getPosts_WhereLikeMore(),
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Error" });
  }
}
