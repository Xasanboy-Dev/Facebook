import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  CheckUserExist,
  FindUser,
  removePostFromUser,
  UnsavePost,
} from "../Database/user";
import { checkPostExist, checkSaved } from "../Database/post";
import { SavePOST } from "../Database/user";
const prisma = new PrismaClient();

export async function SavePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const post = await checkPostExist(+id);
    const user = await CheckUserExist(email);
    if (!post || !user) {
      return res.status(500).json({ message: "Please try again!" });
    }

    const checkSavedOrNo = await checkSaved(user.id, post.id);
    let savedUser: any;
    if (!checkSavedOrNo) {
      savedUser = await SavePOST(user.id, post.id);
    } else {
      savedUser = await UnsavePost(user.id, post.id);
    }

    res.status(201).json({ message: "Saved succesfully", user: savedUser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function removeSavedFromUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const post = await checkPostExist(+id);
    const user = await CheckUserExist(email);
    if (!post || !user) {
      return res.status(500).json({ message: "Please try again!" });
    }
    const removedPost = await removePostFromUser(user.id, +id);
    res
      .status(201)
      .json({ message: "Removed succesfully!", user: removedPost });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAboutUserWithEmail(req: Request, res: Response) {
  try {
    const { email } = req.params
    const user = await FindUser(email)
    if (!user) {
      return res.status(409).json({ message: "You have some problems!" })
    }
    res.status(200).json({ message: "All good", user })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ mesage: "internal error" })
  }
}