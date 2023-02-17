import axios from "axios";
import { prisma } from "./db";

export async function GetPosts() {
  return prisma.posts.findMany();
}

export async function removerPostById(id: number) {
  return await prisma.posts.delete({ where: { id } });
}
