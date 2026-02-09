import { prisma } from '../prisma.js'

async function main() {
  const centers = await prisma.center.findMany()
  console.log("centers: ", centers)
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })