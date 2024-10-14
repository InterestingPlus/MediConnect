import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header>
        <h1>HRM</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-doctors">View All Doctors</NavLink>
            </li>
          </ul>
          <ul>
            <li className="login">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="sign-up">
              <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Navbar;
