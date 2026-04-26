import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <span className="app-nav-brand">Tourist Safety</span>
        <div className="app-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
