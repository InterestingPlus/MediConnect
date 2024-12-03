import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import Logo from "../images/NewLogo2.png";
import Logo from "../images/White.png";


function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header>
        <h1>
          <img src={Logo} /> Medi<span>Connect</span>
        </h1>
        <nav className={`mobile ${menu ? "close" : ""}`}>
          <ul>
            <li onClick={() => setMenu(true)}>
              <NavLink to="/">
                <i class="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="login" onClick={() => setMenu(true)}>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="sign-up" onClick={() => setMenu(true)}>
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
              <i class="fi fi-br-bars-sort"></i>
            ) : (
              <i class="fi fi-br-cross"></i>
            )}
          </button>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Navbar;
