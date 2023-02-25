import { Posts } from "@prisma/client";
import e, { Request, Response } from "express";
import { CheckUserExist } from "../Database/user";
import { updateVideoText, Videos } from "../Database/videos";
import {
  addCommentID,
  checkPostExist,
  checkPostSave,
  deleteWithId,
  getPosts_WhereLikeMore,
  postText,
  removeSaved,
  removeUserToPost,
  savePost,
  saveUserToPost,
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
    if (comment) {
      const added = await addCommentID(post.id, comment?.id);
      return res.status(201).json({ message: "Added succesfully", comment });
    }
    res.status(500).json({ message: "Internal error" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function savePost_Or_Unsave(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { email } = req.body;
    const user = await CheckUserExist(email);
    const post = await checkPostExist(+postId);
    if (!user || !post) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    const isTrue = await checkPostSave(user.email, post.id);
    if (!isTrue) {
      let savedUser = await savePost(user.email, post.id);
      let savedPost = await saveUserToPost(user.email, post.id);
      if (savedUser && savedPost) {
        return res
          .status(201)
          .json({ message: "Saved succesfully!", user: savedUser });
      }
      return res.status(409).json({ message: "You have some problems!" });
    } else {
      let unsaved = await removeSaved(user.email, post.id);
      let unsavedFromPosts = await removeUserToPost(user.email, post.id);
      if (unsaved && unsavedFromPosts) {
        return res
          .status(201)
          .json({ message: "Unsaved succesfully!", user: unsaved });
      } else {
        return res.status(409).json({ message: "You have some problems!" });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internall Error" });
  }
}

export async function getAllSavedPosts(req: Request, res: Response) {
  try {
    const email = req.headers.authorization;
    if (email) {
      const user = await CheckUserExist(email!);
      if (user) {
        let arr = user.userFavorites;
        let posts: Posts[] = [];
        for (let i in arr) {
          const post = await checkPostExist(arr[i]);
          if (post) {
            posts.push(post);
          }
        }
        return res
          .status(200)
          .json({ message: "All your saved posts!", posts });
      }
      res.status(409).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "internal error" });
  }
}
