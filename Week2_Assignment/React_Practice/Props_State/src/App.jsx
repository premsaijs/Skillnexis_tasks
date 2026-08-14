import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Props &amp; State Demo</h1>
      <p className="app-subtitle">
        Exercise 2 - each Counter gets its own <code>step</code> and <code>label</code> as props,
        but keeps its own count as state.
      </p>
      <div className="counter-grid">
        <Counter label="Counts by 1" step={1} />
        <Counter label="Counts by 5" step={5} />
        <Counter label="Counts by 10" step={10} />
      </div>
    </div>
  );
}

export default App;
