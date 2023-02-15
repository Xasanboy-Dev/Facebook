import axios from "axios";
import { prisma } from "./db";

export async function createANewPost(
  letter: string,
  image: any,
  video: any,
  email: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return "This email is not valid. Please and try again!";
    }
    if (!image && !video) {
      const createdPost = prisma.posts.create({
        data: {
          title: letter,
          type_of_post: "Only letter",
          user_Id: user.id,
          user_name: user.name,
        },
      });
      console.log(await createdPost);
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function GetPosts() {
  return prisma.posts.findMany();
}

export async function removerPostById(id: number) {
  return await prisma.posts.delete({ where: { id } });
}
