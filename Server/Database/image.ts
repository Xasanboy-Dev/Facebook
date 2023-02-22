import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function UpdateImagePath(email: string) {
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return false;
  }
  return true;
}

export async function getImagetoProgile(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return {
    posts: await prisma.posts.findMany({
      where: { user_Id: user?.id },
    }),
    texts: await prisma.posts.findMany({
      where: { type_of_post: "TEXT" },
    }),
  };
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
  await prisma.images.create({
    data: {
      authorEmail: email,
      authorId: User!.id,
      postId: (await newPost).id,
      title: "new Photo",
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
  let post = await prisma.posts.create({
    data: {
      email,
      text: letter,
      title: name,
      type_of_post: "Video",
      user_Id: User!.id,
      user_name: User!.name,
    },
  });
  const newPost = prisma.videos.create({
    data: {
      title: name,
      authorEmail: User!.email,
      authorId: User!.id,
      VideoName:name,
      text: letter,
      postId: post.id,
    },
  });
  return { Post: await newPost };
}
