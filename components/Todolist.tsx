import { useAtom } from 'jotai'
import { activeTodoCountAtom, filterType } from '../store/todos'
import TodoItem, { Todo } from './TodoItem'

interface Props {
  todos: Todo[]
}

const TodoList: React.FC<Props> = ({ todos = [] }) => {
  const [type, setType] = useAtom(filterType)
  const [activeCount] = useAtom(activeTodoCountAtom)
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input type="text" className="new-todo" placeholder="What needs to be done?" />
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
      </footer>
    </>
  )
}

export default TodoList
