import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header>
        <h1>HMS</h1>
        <nav className={`mobile ${menu ? "close" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">
                <i class="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="login">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="sign-up">
              <NavLink to="/sign-up">
                <i class="fa-solid fa-user-plus"></i> Sign Up
              </NavLink>
            </li>
          </ul>
          <button
            onClick={() => {
              setMenu(!menu);
            }}
            id="menu"
          >
            {menu ? (
              <i class="fa-solid fa-list"></i>
            ) : (
              <i class="fa-solid fa-x"></i>
            )}
          </button>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Navbar;
