import { useRef, useState } from 'react'

export interface Todo {
  label: string
  done: boolean
  id: number
}

interface Props {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  return (
    <li className={`${editing ? 'editing' : ''} ${todo.done ? 'completed' : ''}`}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={todo.done} onChange={() => {}} autoFocus />
        <label>{todo.label}</label>
        <button className="destroy" />
      </div>
      {editing && <input ref={ref} type="text" className="edit" />}
    </li>
  )
}

export default TodoItem
