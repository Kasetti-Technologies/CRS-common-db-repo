import { prisma } from "../../../../prisma.js";

export const create = (data: any) =>
  prisma.availabilityRule.create({ data })
