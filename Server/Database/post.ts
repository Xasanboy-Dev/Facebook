import { Posts } from "@prisma/client";
import { prisma } from "./db";

export async function GetPosts() {
  return prisma.posts.findMany();
}

export async function removerPostById(id: number) {
  return await prisma.posts.delete({ where: { id } });
}

export async function postText(text: string, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return;
  }
  return prisma.posts.create({
    data: {
      email: email,
      text,
      title: "TEXT",
      type_of_post: "Letter",
      user_Id: user!.id,
      user_name: user.name,
    },
  });
}

export async function checkPostExist(id: number) {
  try {
    return await prisma.posts.findUnique({ where: { id } });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function deleteWithId(id: number) {
  let post = await prisma.posts.delete({ where: { id } });
  if (post.type_of_post == "Letter") {
    await prisma.posts.delete({ where: { id } });
  } else if (post.type_of_post == "Video") {
    await prisma.videos.delete({ where: { postId: id } });
    return prisma.posts.delete({ where: { id } });
  } else if (post.type_of_post == "Photo") {
    await prisma.images.delete({ where: { postId: id } });
    return prisma.posts.delete({ where: { id } });
  }
}

export async function getPosts_WhereLikeMore() {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export async function AllPosts() {
  return {
    images: await prisma.images.findMany(),
    vidoes: await prisma.videos.findMany(),
  };
}

export async function addLikee(Userid: number, postId: number) {
  try {
    const Post: any = await checkPostExist(postId);
    let likes = Post.likes_of_this_Post;
    let bool = likes.includes(Userid);
    if (bool) {
      return false;
    }
    likes.push(Userid);
    if (!bool) {
      const post = await prisma.posts.update({
        where: { id: postId },
        data: { likes_of_this_Post: likes },
      });
      if (post.type_of_post == "Photo") {
        await prisma.images.update({
          where: { postId },
          data: { likes_of_this_Post: likes },
        });
        return post;
      } else if (post.type_of_post == "Video") {
        await prisma.videos.update({ where: { postId }, data: { likes } });
        return post;
      }
      return post;
    }
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export async function addDIsLikee(Userid: number, postId: number) {
  try {
    const Post: any = await checkPostExist(postId);
    let dislikes = Post.dislikes_of_this_Post;
    let bool = dislikes.includes(Userid);
    if (bool) {
      return false;
    }
    dislikes.push(Userid);
    if (!bool) {
      const post = await prisma.posts.update({
        where: { id: postId },
        data: { dislikes_of_this_Post: dislikes },
      });
      if (post.type_of_post == "Photo") {
        await prisma.images.update({
          where: { postId },
          data: { dislikes_of_this_Post: dislikes },
        });
        return post;
      } else if (post.type_of_post == "Video") {
        await prisma.videos.update({ where: { postId }, data: { dislikes } });
        return post;
      }
      return post;
    }
  } catch (error: any) {
    console.log(error);
    return false;
  }
}
