import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        if (user.role === "d") {
          navigate("/doctor-dashboard");
        } else if (user.role === "p") {
          navigate("/patient-dashboard");
        }
      }
    }

    checkLocalUser();
  }, []);

  return (
    <main id="sign-up">
      <h1>Login as :</h1>

      <div className="role">
        <span className={select === 1 ? "selected" : ""}>
          <label
            htmlFor="patient"
            onClick={() => {
              setSelect(1);
            }}
          >
            <i class="fi fi-ss-user-injured"></i> Patient
          </label>
          <input type="radio" name="role" id="patient" required />
        </span>

        <span className={select === 2 ? "selected" : ""}>
          <label
            htmlFor="doctor"
            onClick={() => {
              setSelect(2);
            }}
          >
            <i class="fi fi-ss-user-md"></i> Doctor
          </label>
          <input type="radio" name="role" id="doctor" required />
        </span>

        <span className={select === 3 ? "selected" : ""}>
          <label
            htmlFor="admin"
            onClick={() => {
              setSelect(3);
            }}
          >
            <i class="fi fi-ss-admin-alt"></i> Admin
          </label>
          <input type="radio" name="role" id="admin" required />
        </span>
      </div>

      <Link
        to={
          select === 2
            ? "/login-doctor"
            : select === 1
            ? "/login-patient"
            : select === 3
            ? "/login-admin"
            : "/login"
        }
      >
        <button className={select === 0 ? "next disable" : "next"}>Next</button>
      </Link>
    </main>
  );
}

export default Login;
