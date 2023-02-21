export interface Videos {
  id: number;
  published: boolean;
  authorId: number;
  authorEmail: string;
  VideoName: string;
  createdAt: string;
  title: string;
  likes: number[];
  dislikes: number[];
  text: string;
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function Videos() {
  return prisma.videos.findMany();
}

export async function updateVideoText(id: number, body: Videos) {
  const video = await prisma.videos.findMany();
  console.log(video);
}
