import { Request, Response } from "express";
import { FindUser } from "../Database/user";
export async function GetAllPostsByUserEmail(req: Request, res: Response) {
  try {
    let { email } = req.params;
    console.log(await FindUser(email));
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Interal error" });
  }
}
