import { prisma } from "../../../../prisma.js";

export const create = (data: any) =>
  prisma.machine.create({ data })

export const update = (id: string, data: any) =>
  prisma.machine.update({ where: { id }, data })
