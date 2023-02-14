import { prisma } from "./db";
export async function UpdateImagePath(email: string, path: string) {
  let user = prisma.user.findFirst({ where: { email } });
  if (!user) {
    return "Noe found!";
  }
  return prisma.user
}
