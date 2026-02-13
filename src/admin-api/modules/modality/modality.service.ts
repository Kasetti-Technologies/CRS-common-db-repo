import { prisma } from "../../../../prisma.js";

export const create = (data: any) =>
  prisma.modality.create({ data })

export const list = () =>
  prisma.modality.findMany()
