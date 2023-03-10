type User = {
  id: number;
  name: string;
  email: string;
  lastname: string;
  password: string;
};
import e, { Request, Response } from "express";
import {
  CreateUser,
  deleteUs,
  EditUser,
  jwtVerify,
  Login,
  SearchAccountByLetter,
  seeAll,
  SeeAllUsers,
} from "../Database/db";
import { jwtSign } from "../Database/db";
import { getImagetoProgile, UpdateImagePath } from "../Database/image";
import { FindSomeOneWithEmail, PostsByEmail } from "../Database/user";
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
    const token: any = await jwtSign(user.email, user.id, name, user.imageUrl);
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
export default async function createImagePost(req: Request, res: Response) {
  try {
    let email = req.headers.authorization;
    let result = await UpdateImagePath(email!);
    if (!result) {
      return res.status(400).json({ message: "Please login again!" });
    }
    res.status(201).json(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bad Reuqest" });
  }
}

export async function createDashboardImage(req: Request, res: Response) {
  try {
    let email = req.headers.authorization;
    let result = await UpdateImagePath(email!);
    if (!result) {
      return res.status(400).json({ message: "Please login again!" });
    }
    res.status(200).json({ message: "Pasted succesfully!" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function SeeAllPublishedUsers(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const Users = await SeeAllUsers(name);
    const UpdatdUser = await EditUser(name);
    if (UpdatdUser) {
      return res.status(200).json({ message: "Good", users: UpdatdUser });
    }
    res.status(409).json({ message: "You havesome problems!" });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function GetImageOfProfile(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const result = await getImagetoProgile(email);
    if (!result) {
      return res.status(500).json({ message: "Pleas login again!" });
    } else {
      res.status(200).json({
        message: "All your photots!",
        posts: result.posts,
        texts: result.texts,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error at getting image to profile!" });
  }
}

export async function FindUserByEmail(req: Request, res: Response) {
  try {
    const { token } = req.params;
    let userData = jwtVerify(token);
    if (!userData) {
      return res.status(400).json({ message: "Please login again!" });
    }
    if (!FindSomeOneWithEmail(token)) {
      return res.status(500).json({ message: "You must Login!" });
    }
    res.status(200).json({
      message: "Good work.",
      posts: await FindSomeOneWithEmail(token),
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function getPostsByEmail(req: Request, res: Response) {
  try {
    let { email } = req.params;
    let result: { Videos: any; Photos: any; Letters: any } | undefined =
      await PostsByEmail(email);
    res.status(200).json({
      videos: result!.Videos,
      photos: result!.Photos,
      letters: result!.Letters,
      message: "All posts with filter!",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
}
