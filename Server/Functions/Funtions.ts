import { Request, Response } from "express";
import { CreateUser, deleteUs, Login, seeAll } from "../Database/db";

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await Login(email, password);
    if (!user) {
      res.status(400).json({ message: "User Not Found!" });
      return;
    }
    res.status(200).json({ message: "User", user });
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
