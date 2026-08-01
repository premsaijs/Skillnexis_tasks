// CategoryFilter.jsx
function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${activeCategory === category ? "active" : ""}`}
          aria-pressed={activeCategory === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
