import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function DoctorNav() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/doctor-dashboard");
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
              <NavLink to="/">
                <i class="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-dashboard/appointments">
                <i class="fa-regular fa-calendar-check"></i> View Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-dashboard/history">
                <i class="fa-solid fa-clock-rotate-left"></i> Patients History
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctor-dashboard/laboratory">
                <i class="fa-solid fa-hospital-user"></i> Laboratory Reports
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
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>

            <li className="profile">
              <NavLink to="/doctor-dashboard">
                <i class="fa-solid fa-user-doctor"></i>
                My Profile
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

      <main id="dashboard">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorNav;
