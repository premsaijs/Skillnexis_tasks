import Card from './components/Card';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>CSS Modules Demo</h1>
      <p className={styles.subtitle}>
        Exercise 5 - styling with CSS Modules instead of global CSS.
      </p>
      <div className={styles.grid}>
        <Card title="Locally Scoped" badge="CSS">
          Class names get scoped automatically, so they can't clash with styles elsewhere.
        </Card>
        <Card title="Component Owned" badge="Modules">
          Each component's CSS file lives right next to it.
        </Card>
      </div>
    </div>
  );
}

export default App;
