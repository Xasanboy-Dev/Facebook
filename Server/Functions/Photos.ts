import { Request, Response } from "express";
import { getAllPhotosUserId } from "../Database/image";

export async function getAllPhotosByUserId(req: Request, res: Response) {
  try {
    const { postID } = req.params;
    if (!postID) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    const photos = await getAllPhotosUserId(+postID);
    if (!photos) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    res.status(200).json({ message: "All photos", photos });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}
