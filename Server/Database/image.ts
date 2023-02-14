import { prisma } from "./db";

export async function UpdateImagePath(email: string, path: string | undefined) {
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return "Noe found!";
  }
  return prisma.user.update({ where: { email }, data: { imageUrl: path } });
}

export async function getImagetoProgile(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
