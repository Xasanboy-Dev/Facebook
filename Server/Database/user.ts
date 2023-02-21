import { prisma } from "./db";

export async function FindSomeOneWithEmail(email: string) {
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    return { photos: user!.publishedPhotos, videos: user!.publishedVideos };
  } catch (error: any) {
    return false
  }
}

export async function FindUser(email: string) {
  try {
    return prisma.user.findUnique({ where: { email } });
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PostsByEmail(email: string) {
  try {
    let Videos = await prisma.posts.findMany({
      where: { type_of_post: "Video" },
    });
    let Photos = await prisma.posts.findMany({
      where: { type_of_post: "Photo" },
    });
    let Letters = await prisma.posts.findMany({
      where: { type_of_post: "Letter" },
    });
    return { Videos, Photos, Letters };
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function CheckUserExist(email: string) {
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
