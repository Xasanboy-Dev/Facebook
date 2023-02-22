import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CheckUserExist, removePostFromUser } from "../Database/user";
import { checkPostExist } from "../Database/post";
import { SavePOST } from "../Database/user";
const prisma = new PrismaClient()


export async function SavePost(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { email } = req.body
        const post = await checkPostExist(+id)
        const user = await CheckUserExist(email)
        if (!post || !user) {
            return res.status(500).json({ message: "Please try again!" })
        }
        const savedUser = await SavePOST(user.id, +id)
        res.status(201).json({ message: "Saved succesfully", user: savedUser })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function removeSavedFromUser(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { email } = req.body
        const post = await checkPostExist(+id)
        const user = await CheckUserExist(email)
        if (!post || !user) {
            return res.status(500).json({ message: "Please try again!" })
        }
        const removedPost = await removePostFromUser(user.id, +id)
        res.status(201).json({ message: "Removed succesfully!", user: removedPost })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}