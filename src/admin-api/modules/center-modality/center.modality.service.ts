import { prisma } from "../../../../prisma";

export const create = (data: any) =>
  prisma.centerModality.create({ data })

export const update = (id: string, data: any) =>
  prisma.centerModality.update({ where: { id }, data })
