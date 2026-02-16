import { prisma } from "../../../../prisma";
import { AppointmentStatus } from '../../../../generated/prisma/client'


export const block = (data: any) =>
  prisma.appointment.create({
    data: { ...data, status: AppointmentStatus.BLOCKED },
  })

export const cancel = (id: string) =>
  prisma.appointment.update({
    where: { id },
    data: { status: AppointmentStatus.CANCELLED },
  })
