import { useAtom } from 'jotai'
import { KeyboardEventHandler, useCallback, useState } from 'react'
import { activeTodoCountAtom, anyTodosDone, filterType, todosAtom } from '../store/todos'
import TodoItem, { Todo } from './TodoItem'

interface Props {
  todos: Todo[]
}

const TodoList: React.FC<Props> = ({ todos = [] }) => {
  const [, setTodos] = useAtom(todosAtom)
  const [type, setType] = useAtom(filterType)
  const [activeCount] = useAtom(activeTodoCountAtom)
  const [anyDone] = useAtom(anyTodosDone)

  const [newTodo, setNewTodo] = useState('')

  const onAddTodo = useCallback(
    ((e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (newTodo) {
          setTodos((oldTodos) => {
            return [...oldTodos, { label: newTodo } as Todo]
          })
          setNewTodo('')
        }
      }
    }) as KeyboardEventHandler<HTMLInputElement>,
    [newTodo]
  )
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value)
          }}
          onKeyPress={onAddTodo}
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        <input type="checkbox" className="toggle-all" />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a onClick={() => setType('all')} className={type == 'all' ? 'selected' : ''}>
              All
            </a>
          </li>
          <li>
            <a onClick={() => setType('active')} className={type == 'active' ? 'selected' : ''}>
              Active
            </a>
          </li>
          <li>
            <a onClick={() => setType('completed')} className={type == 'completed' ? 'selected' : ''}>
              Completed
            </a>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={() => {}}>
            Clear completed
          </button>
        )}
      </footer>
    </>
  )
}

export default TodoList
