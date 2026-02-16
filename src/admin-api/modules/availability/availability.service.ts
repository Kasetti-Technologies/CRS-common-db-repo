import { prisma } from "../../../../prisma";

export const create = (data: any) =>
  prisma.availabilityRule.create({ data })
