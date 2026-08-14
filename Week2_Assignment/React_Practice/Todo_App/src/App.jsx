import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

let nextId = 1;

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: nextId++, text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <p className="app-subtitle">Exercise 3 - add, complete, and delete tasks.</p>
      <TodoForm onAdd={addTodo} />
      {todos.length === 0 ? (
        <p className="empty-state">No tasks yet — add one above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
