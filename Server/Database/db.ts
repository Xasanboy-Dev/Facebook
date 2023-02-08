import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
type User = {
    name: string
    lastname: string
    email: string
    password: string
}

export async function Login(email: string, password: string) {
    return await prisma.user.findMany({ where: { email, password } })
}

export async function CheckUserExist(email: string) {
    const user = await prisma.user.findMany({ where: { email } })
    return user.length == 0
}

export async function CreateUser(data: User) {
    await prisma.user.create({ data })
    return 'Created succesfully'
}

export async function seeAll() {
    return await prisma.user.findMany()
}
