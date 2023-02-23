import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function FindSomeOneWithEmail(email: string) {
  try {
    let user = await prisma.user.findUnique({ where: { email: email } });
    return { photos: user!.publishedPhotos, videos: user!.publishedVideos };
  } catch (error: any) {
    return false;
  }
}

export async function FindUser(email: string) {
  try {
    return prisma.user.findUnique({ where: { email } });
  } catch (error: any) {
    console.log(error.message);
    return false;
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
    return await prisma.user.findUnique({ where: { email } });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function SavePOST(userId: number, postID: number) {
  try {
    let lastUser = await prisma.user.findUnique({ where: { id: userId } });
    let arr = lastUser?.userFavorites;
    if (!arr?.includes(postID)) {
      arr?.push(postID);
      return await prisma.user.update({
        where: { id: userId },
        data: { userFavorites: arr },
      });
    }
    return "Not Given";
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export async function removePostFromUser(userId: number, postID: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    let arr = user?.userFavorites;
    let newArr: number[] = [];
    if (arr?.includes(postID)) {
      newArr = [];
      for (let i in arr) {
        if (arr[i] !== postID) {
          newArr.push(postID);
        }
      }
    }
    const savedUser = await prisma.user.update({
      where: { id: userId },
      data: { userFavorites: newArr },
    });

    return savedUser;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
