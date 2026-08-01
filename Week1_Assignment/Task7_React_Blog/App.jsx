// App.jsx
// Wires up state for search + category filtering, and composes all components.
// Post data comes from the global BLOG_POSTS array defined in data/posts.js.

const { useState, useMemo } = React;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = [...new Set(BLOG_POSTS.map((post) => post.category))];
    return ["All", ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const recentPosts = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    []
  );

  return (
    <React.Fragment>
      <Navbar />
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className="blog-layout">
        <div>
          <p className="results-count">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
          </p>
          <div className="blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
            ) : (
              <p className="no-results">No posts match your search. Try a different keyword or category.</p>
            )}
          </div>
        </div>

        <Sidebar recentPosts={recentPosts} allCategories={categories.filter((c) => c !== "All")} />
      </div>

      <Footer />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
