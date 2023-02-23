import e, { Request, Response } from "express";
import { CheckUserExist } from "../Database/user";
import { updateVideoText, Videos } from "../Database/videos";
import {
  checkPostExist,
  deleteWithId,
  getPosts_WhereLikeMore,
  postText,
  writeComment,
} from "./../Database/post";
import { GetPosts, removerPostById } from "./../Database/post";
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
    const { email } = req.body;

    const existPost = await checkPostExist(+id);
    const existUser = await CheckUserExist(email);
    if (!existPost || !existUser || existPost.email !== existUser.email) {
      return res
        .status(409)
        .json({ message: "You have some problems. Please try again later!" });
    }
    res
      .status(200)
      .json({ message: "Deleted!", deletedPost: await removerPostById(+id) });
  } catch (error: any) {
    console.log(error.message);
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
    res.status(200).json({
      message: "Posts in order",
      posts: await getPosts_WhereLikeMore(),
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Error" });
  }
}
export async function getVideos(req: Request, res: Response) {
  try {
    const videos = await Videos();
    res.status(200).json({ message: "All videos", videos });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editVideosText(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body: Videos = req.body;
    const updatedVideo = updateVideoText(+id, body);
    res.status(201).json({ message: "Updated succesfully", updatedVideo });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function postComment(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    const { email, text } = req.body;
    const post = await checkPostExist(+postID);
    const user = await CheckUserExist(email);
    if (!post || !user) {
      return res
        .status(200)
        .json({ message: "You must to login or SELECT exist post!" });
    }
    const comment = await writeComment(user.id, post.id, text);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
