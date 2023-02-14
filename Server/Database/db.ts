import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "SECRET";
export const prisma = new PrismaClient();
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

export async function jwtSign(email: string, id: number, name: string) {
  return jwt.sign({ email, id, name }, SECRET);
}

export async function jwtVerify(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error: any) {
    return error.message;
  }
}

export async function SearchAccountByLetter(type: string, text: string) {
  if (type == "videos") {
    const data = await prisma.videos.findMany({
      where: {
        title: {
          startsWith: text,
          contains: text,
        },
        published: true,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: text,
          contains: text,
        },
        published: true,
      },
    });
    return { users, data };
  } else if (type == "posts") {
    const data = await prisma.images.findMany({
      where: {
        title: {
          contains: text,
          startsWith: text,
        },
        published: true,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: text,
          startsWith: text,
        },
        published: true,
      },
    });
    return { users, data };
  }
  return {
    users: await prisma.user.findMany({
      where: {
        name: {
          contains: text,
          startsWith: text,
        },
        published: true,
      },
    }),
  };
}

export async function SeeAllUsers(name: string) {
  return await prisma.user.findMany({ where: { name } });
}

export async function EditUser(name: string) {
  const user = await prisma.user.findMany({ where: { name } });
  if (user.length !== 0) {
    const { id } = user[0];
    await prisma.user.update({ where: { id }, data: { published: true } });
    console.log("Updated Succesfully");
  }
}

export async function AllPosts() {
  return {
    images: await prisma.images.findMany(),
    vidoes: await prisma.videos.findMany(),
  };
}