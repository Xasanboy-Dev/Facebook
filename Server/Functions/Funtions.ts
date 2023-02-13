type User = {
  id: number;
  name: string;
  email: string;
  lastname: string;
  password: string;
};
import multer from "multer";
import { request, Request, Response } from "express";
import {
  AllPosts,
  CreateUser,
  deleteUs,
  EditUser,
  Login,
  SearchAccountByLetter,
  seeAll,
  SeeAllUsers,
} from "../Database/db";
import { jwtSign } from "../Database/db";

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    let user: any = await Login(email, password);
    user = user[0];
    if (!user) {
      res.status(201).json({ message: "User not found!" });
      return;
    }
    const { name }: any = user;
    const token: any = await jwtSign(user.email, user.id, name);
    user = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
    res.header("authorization", token);
    res.status(200).json({ message: "User", token: token, user });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "An Error in Login User" });
  }
}
export async function RegisterUser(req: Request, res: Response) {
  try {
    const { name, email, password, lastname } = req.body;
    const createdUser = await CreateUser(name, lastname, password, email);
    res.status(201).json({ message: "Created succes!", USER: createdUser });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "You have problems in Creating User!" });
  }
}

export async function aboutAllUser(req: Request, res: Response) {
  const users = await seeAll();
  res.status(200).json(users);
}

export async function DeleteUse(req: Request, res: Response) {
  try {
    const deletedUser = await deleteUs(+req.params.id);
    res.status(200).json({ message: "User deleted", USER: deletedUser });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error in deleting User" });
  }
}

export async function Searching(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { posts, hashtag, video } = req.body;
    let arr: string[] = [];

    if (posts) {
      arr.push("posts");
    }

    if (hashtag) {
      arr.push("hashtag");
    }

    if (video) {
      arr.push("videos");
    }
    if (arr.length !== 0) {
      for (let r in arr) {
        const data = await SearchAccountByLetter(arr[r], id);
        res.status(200).json({ message: "Users", data });
      }
    } else {
      const data = await SearchAccountByLetter("", id);
      res.status(200).json({ message: "Messages", data });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
}

export default function createImagePost(req: Request, res: Response) {
  try {
    console.log(req.body)
    // res.status(201).json(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Reuqest" });
  }
}

export async function SeeAllPublishedUsers(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const Users = await SeeAllUsers(name);
    console.log(Users);
    const UpdatdUser = await EditUser(name);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function AllPostsForUser(req: Request, res: Response) {
  try {
    const posts = await AllPosts();
    console.log(posts);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error in Getting all posts!" });
  }
}

