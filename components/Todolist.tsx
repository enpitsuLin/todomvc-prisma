import TodoItem, { Todo } from './TodoItem'

interface Props {
  todos: Todo[]
}

const TodoList: React.FC<Props> = ({ todos = [] }) => {
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
          <strong>1</strong>items left
        </span>
        <ul className="filters">
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default TodoList
