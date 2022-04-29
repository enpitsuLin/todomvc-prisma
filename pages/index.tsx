import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import Footer from '../components/Footer'
import { Todo } from '../components/TodoItem'
import TodoList from '../components/Todolist'
import prisma from '../lib/prisma'

const Blog: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <div>
      <div className="todoapp">
        <TodoList todos={props.items} />
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{ items: Todo[] }> = async () => {
  const items = await prisma.todoItem.findMany()
  return { props: { items: items.map((item) => ({ id: item.id, label: item.title, done: item.completed })) } }
}

export default Blog
