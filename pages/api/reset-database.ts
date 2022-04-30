import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  console.log(req.query)

  if (token === process.env.NEXT_PUBLIC_RESET_TOKEN) {
    await prisma.todoItem.deleteMany({
      where: {
        createAt: {
          lt: new Date()
        }
      }
    })
    await prisma.todoItem.create({
      data: {
        label: 'Todo Items will be reset pre hour'
      }
    })
    res.status(200).json({ message: 'Success', data: JSON.stringify(req.query) })
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}
