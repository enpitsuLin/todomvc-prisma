import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import Footer from '../components/Footer'
import { Todo } from '../components/TodoItem'
import TodoList from '../components/Todolist'
import prisma from '../lib/prisma'
import { filterAtom, todosAtom } from '../store/todos'

const Blog: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const initialTodos = props.items
  useHydrateAtoms([[todosAtom, initialTodos]] as const)
  const [todos] = useAtom(filterAtom)
  return (
    <div>
      <div className="todoapp">
        <TodoList todos={todos} />
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ items: Todo[] }> = async () => {
  const items = await prisma.todoItem.findMany()
  return { props: { items: items.map((item) => ({ id: item.id, label: item.label, done: item.done })) } }
}

export default Blog
