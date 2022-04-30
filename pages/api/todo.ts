import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function createTodo(label: string) {
  await prisma.todoItem.create({
    data: {
      label
    }
  })
}
async function deleteTodo(id: string) {
  await prisma.todoItem.delete({
    where: { id }
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
      // add todo/update todo
      case 'POST': {
        const body: { label: string; id?: string; done?: boolean } = JSON.parse(req.body)
        if (body.id) await updateTodo(body.id, body.label, body.done)
        else await createTodo(body.label)
        break
      }
      // delete todo
      case 'DELETE': {
        const id = (req.query.id as string) || (JSON.parse(req.body).id as string)
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
