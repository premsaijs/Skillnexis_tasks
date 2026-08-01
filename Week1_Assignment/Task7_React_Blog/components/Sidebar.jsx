// Sidebar.jsx
function Sidebar({ recentPosts, allCategories }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card about-card">
        <h4>About Signal</h4>
        <p>A build log by Prem Sai J S — AI &amp; ML student, sharing notes on code, ML, and everything in between.</p>
      </div>

      <div className="sidebar-card">
        <h4>Recent Posts</h4>
        {recentPosts.map((post) => (
          <div className="recent-post" key={post.id}>
            <span className="recent-post-icon">{post.cover}</span>
            <div>
              <div className="recent-post-title">{post.title}</div>
              <div className="recent-post-date">{post.readTime}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-card">
        <h4>Categories</h4>
        <div className="tag-cloud">
          {allCategories.map((cat) => (
            <span key={cat}>{cat}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}
