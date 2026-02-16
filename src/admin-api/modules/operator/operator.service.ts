import { prisma } from "../../../../prisma";

export const create = (data: any) =>
  prisma.operator.create({ data })

export const addLeave = (operatorId: string, date: string) =>
  prisma.operatorLeave.create({
    data: { operatorId, date: new Date(date) },
  })
