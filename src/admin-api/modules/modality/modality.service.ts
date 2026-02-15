import { prisma } from "../../../../prisma";

export const create = (data: any) =>
  prisma.modality.create({ data })

export const list = () =>
  prisma.modality.findMany()
