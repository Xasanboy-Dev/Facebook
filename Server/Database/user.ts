import { prisma } from "./db";

export async function FindSomeOneWithEmail(email: string) {
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    return { photos: user!.publishedPhotos, videos: user!.publishedVideos };
  } catch (error: any) {
    return "Internal error";
  }
}

export async function FindUser(email: string) {
  try {
    return prisma.user.findUnique({ where: { email } })
  } catch (error: any) {
    console.log(error.message);
  }
}
