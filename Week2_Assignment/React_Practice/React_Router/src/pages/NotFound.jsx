import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page">
      <h2>404 — Page Not Found</h2>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
}

export default NotFound;
