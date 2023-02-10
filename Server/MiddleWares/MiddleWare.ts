import { Request, Response, NextFunction } from "express";
import { CheckUserExist, jwtVerify } from "../Database/db";
import multer from "multer";
import path from "path";
import uuid from "uuid";
interface User {
  email: string;
  id: number;
}
let storage: any = multer.diskStorage({
  destination: (req: Request, files: any, cb: any) => {
    cb(null, "./Facebook/../Server/Images");
  },
  filename: (req: Request, file: any, cb: any) => {
    let name = uuid;
    console.log(name);
    return;
    console.log(file);
    cb(null, name + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

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

export async function CheckToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.body;
    try {
      const userData = await jwtVerify(token);
    } catch (error) {
      return res.status(201).json({ message: "Please login again!" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error at Checkin token!" });
  }
}