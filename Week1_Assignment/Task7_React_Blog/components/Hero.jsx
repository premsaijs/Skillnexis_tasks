// Hero.jsx
// Accepts search state + setter as props from App (controlled input).

function Hero({ searchTerm, onSearchChange }) {
  return (
    <section className="blog-hero">
      <p className="eyebrow">// notes on code &amp; machine learning</p>
      <h1>Ideas worth a second read.</h1>
      <p>Short, practical write-ups on web development, Java, and machine learning — from one student's build log.</p>

      <div className="search-box">
        <span aria-hidden="true">🔍</span>
        <label htmlFor="blog-search" className="visually-hidden">Search posts</label>
        <input
          type="text"
          id="blog-search"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </section>
  );
}
