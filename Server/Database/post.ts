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
