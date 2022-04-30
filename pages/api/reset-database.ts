import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
  await prisma.todoItem.deleteMany({
    where: {
      createAt: {
        lt: new Date()
      }
    }
  })
  res.status(200).json({ message: 'Success' })
}
