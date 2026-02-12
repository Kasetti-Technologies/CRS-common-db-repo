import { prisma } from "../../../../prisma.js";

export const createVendor = (data: { name: string }) =>
  prisma.vendor.create({ data })

export const createVendorAdmin = (
  vendorId: string,
  data: { name: string; email: string }
) =>
  prisma.vendorAdmin.create({
    data: { vendorId, name: data.name, email: data.email },
  })

export const listVendors = () =>
  prisma.vendor.findMany({ include: { centers: true, admins: true } })