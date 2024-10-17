import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function DoctorNav() {
  const navigate = useNavigate();

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  return (
    <>
      <header>
        <h1>HMS</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
          <ul>
            <button
              onClick={() => {
                localStorage.clear();
                checkLocalUser();
              }}
              className="logout"
            >
              Logout
            </button>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default DoctorNav;
