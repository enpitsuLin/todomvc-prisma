import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  if (token === process.env.NEXT_PUBLIC_RESET_TOKEN) {
    await prisma.todoItem.deleteMany({
      where: {
        createAt: {
          lt: new Date()
        }
      }
    })
    res.status(200).json({ message: 'Success', data: JSON.stringify(req.query) })
  }
  res.status(403).json({ message: 'Forbidden' })
}
