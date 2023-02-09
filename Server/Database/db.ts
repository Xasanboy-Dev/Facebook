import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "SECRET";
const prisma = new PrismaClient();
type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export async function Login(email: string, password: string) {
  const user = await prisma.user.findMany({ where: { email } });
  if (user.length == 0) {
    return false;
  }
  const pass = user[0].password;
  const bool = bcrypt.compareSync(password, pass);
  if (!bool) {
    return false;
  }
  return user;
}

export async function CheckUserExist(email: string) {
  const user = await prisma.user.findMany({ where: { email } });
  return user.length == 0;
}

export async function CreateUser(
  name: string,
  lastname: string,
  password: string,
  email: string
) {
  const hash = bcrypt.hashSync(password, 8);
  const data = { name, lastname, email, password: hash };
  return await prisma.user.create({ data });
}

export async function seeAll() {
  return await prisma.user.findMany();
}

export async function deleteUs(id: number) {
  return await prisma.user.delete({ where: { id } });
}

export async function jwtSign(email: string, id: number) {
  return jwt.sign({ email, id }, SECRET);
}
