// App.jsx
// Composes Header, Footer, Button, Card, and Profile together,
// and demonstrates state + event handling with a simple counter.

const { useState } = React;

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#components" },
  { label: "About", href: "#about" },
];

const CARD_DATA = [
  { icon: "🧩", title: "Reusable", description: "Every component only knows about its own props." },
  { icon: "⚡", title: "Interactive", description: "The counter below demonstrates state + events." },
  { icon: "🎨", title: "Styled", description: "Shared styles.css keeps every component consistent." },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Header title="React Components" links={NAV_LINKS} />

      <main className="app-main">
        <p className="eyebrow">// task 6</p>
        <h2 className="section-title">Button Component (props: label, variant, onClick)</h2>
        <div className="btn-row">
          <Button label="Primary" variant="primary" onClick={() => alert("Primary clicked!")} />
          <Button label="Outline" variant="outline" onClick={() => alert("Outline clicked!")} />
          <Button label="Danger" variant="danger" onClick={() => alert("Danger clicked!")} />
        </div>

        <h2 className="section-title" id="components">Card Component (props-driven grid)</h2>
        <div className="card-grid">
          {CARD_DATA.map((card) => (
            <Card key={card.title} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>

        <h2 className="section-title">Profile Component</h2>
        <Profile
          name="Prem Sai J S"
          role="AI & ML Student · New Horizon College of Engineering"
          tags={["Java", "Python", "Machine Learning"]}
        />

        <h2 className="section-title">State &amp; Events Demo</h2>
        <div className="counter-box">
          <Button label="−" variant="outline" onClick={() => setCount((c) => c - 1)} />
          <span className="counter-value">{count}</span>
          <Button label="+" variant="primary" onClick={() => setCount((c) => c + 1)} />
        </div>
      </main>

      <Footer text="Task 6 — React Components Practice · Prem Sai J S" />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
