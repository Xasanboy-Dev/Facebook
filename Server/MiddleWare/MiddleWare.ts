import { Request, Response, NextFunction } from "express";
import { CheckUserExist, jwtVerify } from "../Database/db";

interface User {
  email: string
  id: number
}

export async function CheckUser(req: Request, res: Response, next: any) {
  try {
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
      res.status(200).json({
        message: "You have some error in validation!",
      });
      return;
    }
    next();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error in Checking User" });
    return;
  }
}

export async function CheckingRegisteringUser(
  req: Request,
  res: Response,
  next: any
) {
  try {
    const { email } = req.body;
    const bool = await CheckUserExist(email);
    if (bool) {
      next();
      return;
    } else {
      res.status(200).json({ message: "User already exist!" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error in Creating User!" });
  }
}

export async function CheckToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.body
    try {
      const userData = await jwtVerify(token)
      
    } catch (error) {
      return res.status(201).json({ message: "Please login again!" })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: "Error at Checkin token!" })
  }
}  