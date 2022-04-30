import { useAtom } from 'jotai'
import { ChangeEventHandler, KeyboardEventHandler, useCallback } from 'react'
import { useRef, useState } from 'react'
import { todosAtom } from '../store/todos'
import { useDebouncedCallback } from 'use-debounce'
import { useClickAway } from 'react-use'

export interface Todo {
  label: string
  done: boolean
  id: string
  isDelete: boolean
  createAt: string
}

interface Props {
  todo: Todo
}
function useDoubleClick(onClick: any, onDoubleClick: any) {
  let clicks: number[] = []
  let timeout: number

  return (event: any) => {
    clicks.push(new Date().getTime())

    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
        if (onDoubleClick) {
          onDoubleClick(event)
        }
      } else if (onClick) {
        onClick(event)
      }
      clicks = []
    }, 250)
  }
}
const TodoItem: React.FC<Props> = ({ todo }) => {
  const [, setTodos] = useAtom(todosAtom)
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const toggleDone = useDebouncedCallback((done: boolean) => {
    fetch('/api/todo', { method: 'POST', body: JSON.stringify({ id: todo.id, done: !done }) })
  }, 1000)

  const setLabel = useDebouncedCallback((label) => {
    fetch('/api/todo', { method: 'POST', body: JSON.stringify({ id: todo.id, label }) })
  }, 1000)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const label = e?.target.value
    setTodos((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          setLabel(label)
          return { ...t, label }
        }
        return t
      })
    })
  }

  useClickAway(ref, () => {
    finishEditing()
  })

  const finishEditing = useCallback(() => {
    setEditing(false)
  }, [todo])

  const handleViewClick = useDoubleClick(null, () => {
    setEditing(true)
  })

  const onDone = useCallback(() => {
    setTodos((todos) => {
      return todos.map((t) => {
        if (t.id === todo.id) {
          toggleDone(t.done)
          return { ...t, done: !t.done }
        }
        return t
      })
    })
  }, [todo.id])

  const onEnter = useCallback(
    ((event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        finishEditing()
      }
    }) as KeyboardEventHandler<HTMLInputElement>,
    [todo]
  )

  return (
    <li className={`${editing ? 'editing' : ''} ${todo.done ? 'completed' : ''}`} onClick={handleViewClick}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={todo.done} onChange={onDone} autoFocus />
        <label>{todo.label}</label>
        <button className="destroy" />
      </div>
      {editing && (
        <input
          ref={ref}
          type="text"
          autoFocus={true}
          value={todo.label}
          onChange={onChange}
          className="edit"
          onKeyPress={onEnter}
        />
      )}
    </li>
  )
}

export default TodoItem
function DOMAttributes<T>() {
  throw new Error('Function not implemented.')
}
