import { atom } from 'jotai'
import { Todo } from '../components/TodoItem'

export const filterType = atom<'all' | 'active' | 'completed'>('all')

export const todosAtom = atom<Todo[]>([])

export const filterAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => {
    if (get(filterType) === 'all') return true
    return todo.done === (get(filterType) === 'completed')
  })
})

export const activeTodoCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => !todo.done).length
})
