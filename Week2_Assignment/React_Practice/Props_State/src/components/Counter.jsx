import { useState } from 'react';
import PropTypes from 'prop-types';

// label and step come in as props from the parent, count is this component's own state
function Counter({ label, step }) {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h3>{label}</h3>
      <p className="counter__value">{count}</p>
      <div className="counter__controls">
        <button onClick={() => setCount((c) => c - step)}>- {step}</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((c) => c + step)}>+ {step}</button>
      </div>
    </div>
  );
}

Counter.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number
};

Counter.defaultProps = {
  step: 1
};

export default Counter;
