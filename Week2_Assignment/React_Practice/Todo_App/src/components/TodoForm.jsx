import { useState } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === '') return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default TodoForm;
