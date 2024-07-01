import { Link, Outlet } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <h1>About</h1>
      <Outlet />
      <h1>About</h1>
      <ul>
        <li>
          <Link to="team">Team</Link>
        </li>
        <li>
          <Link to="us">Us</Link>
        </li>
        <li>
          <Link to="mission">Mission</Link>
        </li>
      </ul>
    </div>
  );
}
