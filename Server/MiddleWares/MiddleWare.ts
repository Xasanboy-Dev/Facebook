import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { CheckUserExist, jwtVerify } from "../Database/db";
import multer from "multer";

interface User {
  email: string;
  id: number;
}
export const dashBoardImage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "dashboardImages");
  },
  filename: (req: Request, file: any, cb) => {
    let email = req.headers.authorization;
    cb(null, email + ".png");
  },
});

export const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "profileImages");
  },
  filename: (req: Request, file: any, cb) => {
    let email = req.headers.authorization;
    cb(null, email + ".png");
  },
});

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

export async function CheckToken(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const userData = await jwtVerify(token);
    if (userData == "invalid signature") {
      return res
        .status(400)
        .json({ message: "Your account not found!. Please go out!" });
    } else {
      return res.status(200).json({ message: "Token", token: userData });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error at Checkin token!" });
  }
}

export const storageForPost = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "postImages");
  },
  filename: (req: Request, file: any, cb) => {
    let email = req.headers.authorization;
    cb(null, file.originalname + `_${email}.png`);
  },
});
export const uploadForVideos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "postVideos");
  },
  filename: function (req, file, cb) {
    let email = req.headers.authorization;
    cb(null, file.originalname + `_${email}.mp4`);
  },
});
