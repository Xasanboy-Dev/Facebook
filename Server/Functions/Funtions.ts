type User = {
  id: number;
  name: string;
  email: string;
  lastname: string;
  password: string;
};
import { Request, Response } from "express";
import { CreateUser, deleteUs, Login, seeAll } from "../Database/db";
import { jwtSign } from "../Database/db";

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    let user: any = await Login(email, password);
    user = user[0];
    if (!user) {
      res.status(201).json({ message: "User Not Found!" });
      return;
    }
    const token: any = await jwtSign(user.email, user.id);
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
    console.log(id);
    res.status(200).json({ message: id });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
}
