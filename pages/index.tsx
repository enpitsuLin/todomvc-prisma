import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#AF2F2F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <title>todos</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="todoapp">
        <TodoList todos={todos} />
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ items: Todo[] }> = async () => {
  const items = await prisma.todoItem.findMany()
  return { props: { items: items.map((item) => ({ ...item, createAt: item.createAt.toJSON() })) } }
}

export default Blog
