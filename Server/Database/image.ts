import { PrismaClient, user } from "@prisma/client";
import { TokenExpiredError } from "jsonwebtoken";
import { jwtSign, jwtVerify } from "./db";
const prisma = new PrismaClient();
export async function UpdateImagePath(email: string, path: string | undefined) {
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return "Noe found!";
  }
  return prisma.user.update({ where: { email }, data: { imageUrl: path } });
}

export async function getImagetoProgile(email: string) {
  let jwt = await jwtVerify(email);
  let coorectEmail: string;
  if (jwt == "jwt malformed") {
    return false;
  } else {
    coorectEmail = jwt.email;
  }
  const user = await prisma.user.findUnique({ where: { email: coorectEmail } });
  return prisma.posts.findMany({ where: { user_Id: user?.id } });
}

export async function postPhotoFromUser(
  email: string,
  name: string,
  type: string,
  letter: string
) {
  const User = await prisma.user.findUnique({ where: { email } });
  const newPost = prisma.posts.create({
    data: {
      title: name,
      email: User!.email,
      type_of_post: type,
      user_Id: User!.id,
      user_name: User!.name,
      text: letter,
    },
  });
  return { Post: await newPost };
}

export async function postVideoFromUser(
  email: string,
  name: string,
  letter: string
) {
  const User = await prisma.user.findUnique({ where: { email } });
  const newPost = prisma.videos.create({
    data: {
      title: name,
      authorEmail: User!.email,
      authorId: User!.id,
      imageName: name,
      text: letter,
    },
  });
  return { Post: await newPost };
}
