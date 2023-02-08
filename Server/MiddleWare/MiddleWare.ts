import { Request, Response } from 'express'
import { CheckUserExist } from '../Database/db'

export async function CheckUser(req: Request, res: Response, next: any) {
    try {
        const { name, lastname, email, password } = req.body
        if (!name || !lastname || !email || !password) {
            res.status(200).json({
                message: 'You have some error in validation!',
            })
            return
        }
        next()
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: 'Error in Checking User' })
        return
    }
}

export async function CheckingRegisteringUser(
    req: Request,
    res: Response,
    next: any
) {
    try {
        const { name, lastname, email, password } = req.body
        const bool = await CheckUserExist(email)
        if (bool) {
            next()
            return
        } else {
            res.status(422).json({ message: 'User already exist!' })
        }
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: 'Error in Creating User!' })
    }
}
