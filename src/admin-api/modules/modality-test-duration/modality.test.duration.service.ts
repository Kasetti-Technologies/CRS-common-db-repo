import { prisma } from "../../../../prisma";

export const create = (data: any) =>
  prisma.modalityTestDuration.create({ data })

export const update = (id: string, data: any) =>
  prisma.modalityTestDuration.update({ where: { id }, data })
