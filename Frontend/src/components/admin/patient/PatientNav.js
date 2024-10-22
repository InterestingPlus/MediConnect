import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function PatientNav() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/patient-dashboard");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  return (
    <div id="flex">
      <header id="doctor-nav">
        <h1>HMS</h1>
        <nav className={`mobile ${menu ? "close" : ""}`} id="doctor-sidebar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/appointments">
                View Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/history">
                Patients History
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/laboratory">
                Laboratory Reports
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  checkLocalUser();
                }}
                className="logout"
              >
                Logout
              </button>
            </li>

            <li className="profile">
              <NavLink to="/patient-dashboard">My Profile</NavLink>
            </li>
          </ul>
          <button
            onClick={() => {
              setMenu(!menu);
            }}
            id="menu"
          >
            {menu ? "menu" : "close"}
          </button>
        </nav>
      </header>

      <main id="dashboard">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientNav;
