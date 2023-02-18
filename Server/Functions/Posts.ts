import { Request, Response } from "express";
import { updateVideoText, Videos } from "../Database/videos";
import { GetPosts, removerPostById } from "./../Database/post";
export async function GetAllPostsByUserEmail(req: Request, res: Response) {
  try {
    let { email } = req.params;
    // console.log(await FindUser(email));
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
