import { prisma } from "../../../../prisma";

export const createCenter = (data: any) =>
  prisma.center.create({ data })

export const updateStatus = (id: string, isActive: boolean) =>
  prisma.center.update({ where: { id }, data: { isActive } })

export const assignAdmin = (centerId: string, data: any) =>
  prisma.branchAdmin.create({ data: { ...data, centerId } })
