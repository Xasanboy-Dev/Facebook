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
      const createdComment = await prisma.comments_of_posts.create({
        data: {
          postId: post.id,
          typeOfPost: "TEXT",
          userEmail: user.email,
          userId: user.id,
          texts: letter,
        },
      });
      return createdComment;
    }
    return false;
  } catch (error: any) {
    return false;
  }
}

export async function getAllCommentsByPostID(postId: number) {
  try {
    const comment = await prisma.comments_of_posts.findMany({
      where: { postId },
      orderBy: { createdDate: "desc" },
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

export async function Comments() {
  return await prisma.comments_of_posts.findMany();
}

export async function getCommentByID(id: number) {
  try {
    return await prisma.comments_of_posts.findUnique({ where: { id } });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
