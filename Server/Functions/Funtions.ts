import { Request, Response } from "express";

export async function CreateUser(req: Request, res: Response) {
    try {

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Error in creating User!" })
    }
}