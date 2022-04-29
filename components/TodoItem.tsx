import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { useRef, useState } from 'react'
import { todosAtom } from '../store/todos'
import { useDebouncedCallback } from 'use-debounce'

export interface Todo {
  label: string
  done: boolean
  id: number
  isDelete: boolean
  createAt: string
}

interface Props {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [, setTodos] = useAtom(todosAtom)
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const finishEditing = useCallback(() => {
    setEditing(false)
  }, [todo])
  const toggleDone = useDebouncedCallback((id: number, done: boolean) => {
    fetch('/api/todo', { method: 'POST', body: JSON.stringify({ id, done: !done }) })
  }, 1000)
  const onDone = useCallback(() => {
    setTodos((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          toggleDone(t.id, t.done)
          return { ...t, done: !t.done }
        }
        return t
      })
    })
  }, [todo.id])
  return (
    <li className={`${editing ? 'editing' : ''} ${todo.done ? 'completed' : ''}`}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={todo.done} onChange={onDone} autoFocus />
        <label>{todo.label}</label>
        <button className="destroy" />
      </div>
      {editing && <input ref={ref} type="text" className="edit" />}
    </li>
  )
}

export default TodoItem
