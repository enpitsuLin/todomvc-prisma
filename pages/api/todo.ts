import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function createTodo(label: string, id?: string) {
  await prisma.todoItem.create({
    data: {
      label,
      id
    }
  })
}
async function deleteTodo(id: string | string[]) {
  const ids: string[] = typeof id === 'string' ? (id.includes(',') ? id.split(',') : [id]) : id
  await prisma.todoItem.updateMany({
    where: {
      id: {
        in: ids
      }
    },
    data: {
      isDelete: true
    }
  })
}
async function updateTodo(id: string, label: string, done?: boolean) {
  const data = { label, done: undefined as boolean | undefined }
  if (done !== undefined) {
    data.done = done
  }
  await prisma.todoItem.update({
    where: { id },
    data
  })
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const method = req.method

  try {
    switch (method) {
      // create todo
      case 'PUT': {
        const body: { label: string; id?: string } = JSON.parse(req.body)
        await createTodo(body.label, body.id)
        break
      }
      // update todo
      case 'POST': {
        const body: { label: string; id: string; done?: boolean } = JSON.parse(req.body)
        await updateTodo(body.id, body.label, body.done)
        break
      }
      // delete todo
      case 'DELETE': {
        const id = req.query.id || (JSON.parse(req.body).id as string | string[])
        await deleteTodo(id)
        break
      }
      // get todos
      case 'GET': {
        const todos = await prisma.todoItem.findMany()
        res.status(200).json({ message: 'Success', todos })
        return
      }
    }
  } catch (error) {
    console.error(error)
    res.status(403).json({ message: 'Error' })
    return
  }
  res.status(200).json({ message: 'Success' })
}
