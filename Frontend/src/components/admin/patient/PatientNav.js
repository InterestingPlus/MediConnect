import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

function PatientNav() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/patient-dashboard/dashboard");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  return (
    <>
      <div id="flex">
        <header id="doctor-nav">
          <Link to="/">
            <h1>MediConnect</h1>
          </Link>

          <NavLink to="/patient-dashboard/notification" className="icon">
            <i class="fi fi-bs-bell" id="notification"></i>
          </NavLink>

          <nav className={`mobile ${menu ? "close" : ""}`} id="doctor-sidebar">
            <ul>
              <li>
                <NavLink to="/patient-dashboard/dashboard">
                  <i class="fa-solid fa-house"></i> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/patient-dashboard/notification">
                  <i class="fi fi-bs-bell"></i> Notification
                </NavLink>
              </li>
              <li>
                <NavLink to="/patient-dashboard/appointments">
                  <i class="fa-regular fa-calendar-check"></i> Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/patient-dashboard/history">
                  <i class="fa-solid fa-clock-rotate-left"></i> My History
                </NavLink>
              </li>
              <li>
                <NavLink to="/patient-dashboard/laboratory">
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
                <NavLink to="/patient-dashboard/profile">
                  <i class="fa-solid fa-user"></i> My Profile
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
                <i class="fi fi-ss-dot-pending"></i>
              ) : (
                <i class="fi fi-ss-cross-circle"></i>
              )}
            </button>
          </nav>
        </header>

        <main id="dashboard">
          <Outlet />
        </main>
      </div>

      <nav className="bottom-navigation">
        <ul>
          <li title="Home">
            <NavLink to="/patient-dashboard/dashboard">
              <i class="fa-solid fa-house"></i>
            </NavLink>
          </li>
          <li title="History">
            <NavLink to="/patient-dashboard/history">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </NavLink>
          </li>
          <li id="main-btn" title="Appointments">
            <NavLink to="/patient-dashboard/appointments">
              <i class="fa-regular fa-calendar-check"></i>
            </NavLink>
          </li>
          <li title="Laboratory">
            <NavLink to="/patient-dashboard/laboratory">
              <i class="fa-solid fa-hospital-user"></i>
            </NavLink>
          </li>
          <li title="Profile">
            <NavLink to="/patient-dashboard/profile">
              <i class="fa-solid fa-user"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PatientNav;
