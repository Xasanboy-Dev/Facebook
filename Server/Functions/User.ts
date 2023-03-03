import { PrismaClient, user } from "@prisma/client";
import { Request, Response } from "express";
import {
  CheckUserExist,
  FindUser,
  getAllUsers,
  removePostFromUser,
  UnsavePost,
  updateUserByID,
  userId,
} from "../Database/user";
import { checkPostExist, checkPostSaved } from "../Database/post";
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

    const checkSavedOrNo = await checkPostSaved(user.id, post.id);
    let savedUser: any;
    if (checkSavedOrNo == "Yoq") {
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
    const { email } = req.params;
    const user = await FindUser(email);
    if (!user) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    res.status(200).json({ message: "All good", user });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "internal error" });
  }
}
export async function editUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const body: user = req.body;
    const user = await CheckUserExist(email);
    if (!user) {
      return res.status(409).json({ message: "Your email is not valid!" });
    }
    const checkEmail = await CheckUserExist(body.email);
    if (!checkEmail || email == body.email) {
      const updatedUser = await updateUserByID(
        user.email,
        user.id,
        body.name,
        body.lastname,
        body.email,
        body.phoneNumber!,
        body.address!,
        body.Country!,
        body.description!
      );
      return res.status(201).json({ message: "Updated succesfully!" });
    } else {
      return res.status(409).json({
        message: "Your email is already exist. Please write down another one!",
      });
    }
  } catch (err: any) {
    console.log(err.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    const user = await userId(+userID);
    if (!user) {
      return res.status(409).json({ message: "You must to login!" });
    }
    res.status(200).json({ message: "User bio", user });
  } catch (error: any) {
    console.log(error.mesage);
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllDataAboutUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userId(+id);
    if (!user) {
      return res.status(500).json({ message: "You have some problems!" });
    }
    res.status(200).json({ message: "Succes", user });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllUsersForChatting(req: Request, res: Response) {
  try {
    const id = req.header("useid")
    const user = await userId(+id!)
    if (!user) {
      return res.status(404).json({ message: "You must to login!" })
    }
    const getUsers = await getAllUsers()
    res.status(200).json({ message: "All users!", users: getUsers })
  } catch (error: any) {
    console.log(error.mesage)
    res.status(500).json({ message: 'Internal error' })
  }
}