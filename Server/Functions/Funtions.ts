import { empty } from '@prisma/client/runtime'
import { json, Request, Response } from 'express'
import { CreateUser, Login, seeAll } from '../Database/db'
export async function LoginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await Login(email, password)
        if (user.length == 0) {
            res.status(204).json({ message: 'User Not Found!' })
            return
        }
        res.status(200).json({ message: 'User', user })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: 'An Error in Login User' })
    }
}

export async function RegisterUser(req: Request, res: Response) {
    try {
        await CreateUser(req.body)
        res.status(201).json({ message: 'Created succes!' })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: 'You have problems in Creating User!' })
    }
}

export async function aboutAllUser(req: Request, res: Response) {
    const users = seeAll
    res.status(200).json(users)
}
