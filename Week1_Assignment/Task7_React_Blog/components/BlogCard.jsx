// BlogCard.jsx
function BlogCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="blog-card">
      <div className="blog-cover">{post.cover}</div>
      <div className="blog-card-body">
        <span className="blog-category">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-meta">
          <span>{formattedDate}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
