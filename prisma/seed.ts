import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const todoData: Prisma.TodoItemCreateInput[] = [
  {
    label: 'Test1'
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const i of todoData) {
    const item = await prisma.todoItem.create({
      data: i
    })
    console.log(`Created user with id: ${item.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
