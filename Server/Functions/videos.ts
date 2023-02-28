import { Request, Response } from "express";
import { getVideosByUserID } from "../Database/videos";

export async function getAllUserVideosByID(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    if (!+userID) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    const videos = await getVideosByUserID(+userID);
    if (!videos) {
      return res.status(409).json({ message: "You have some problems!" });
    }
    res.status(200).json({ message: "All videos by id " + userID, videos });
  } catch (error: any) {
    res.status(500).json({ message: "Internal error" });
  }
}
