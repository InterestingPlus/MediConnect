import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header>
        <h1>HRM</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-doctors">View All Doctors</Link>
            </li>
          </ul>
          <ul>
            <li className="login">
              <Link to="/login">Login</Link>
            </li>
            <li className="sign-up">
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Navbar;
