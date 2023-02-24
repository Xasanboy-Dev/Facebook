import { PrismaClient } from "@prisma/client";
import { checkPostExist } from "./post";
import { CheckUserExist } from "./user";
const prisma = new PrismaClient();

export async function createComment(
  postId: number,
  userEmail: string,
  letter: string
) {
  try {
    const post = await checkPostExist(postId);
    const user = await CheckUserExist(userEmail);
    if (post && user) {
      return await prisma.comments_of_posts.create({
        data: {
          postId: post.id,
          typeOfPost: "TEXT",
          userEmail: user.email,
          userId: user.id,
          texts: letter,
        },
      });
    }
    return false;
  } catch (error: any) {
    return false;
  }
}

export async function getAllCommentsByPostID(
  postId: number,
  userEmail: string
) {
  try {
    const user = await CheckUserExist(userEmail);
    const comment = await prisma.comments_of_posts.findMany({
      where: { postId },
    });
    return comment;
  } catch (error: any) {
    return false;
  }
}

export async function checkCommentExist(commentID: number) {
  try {
    return await prisma.comments_of_posts.findUnique({
      where: { id: commentID },
    });
  } catch (error: any) {
    return false;
  }
}

export async function removeComment(ID: number) {
  try {
    return await prisma.comments_of_posts.delete({ where: { id: ID } });
  } catch (error: any) {
    return false;
  }
}
