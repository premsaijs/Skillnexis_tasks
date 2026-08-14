import PropTypes from 'prop-types';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <span className="todo-item__text">{todo.text}</span>
      </label>
      <button className="todo-item__delete" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default TodoItem;
