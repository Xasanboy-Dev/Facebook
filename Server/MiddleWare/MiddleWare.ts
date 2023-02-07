import { Request, Response } from "express";



export async function CheckUser(req: Request, res: Response, next: any) {
    try {
        const { name, lastname, email, password } = req.body
        if (!name || !lastname || !email || !password) {
            res.status(200).json({ message: "You have some error in validation!" })
            return
        }
        next()
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Error in Checking User" })
        return
    }
}