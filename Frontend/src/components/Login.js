import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [select, setSelect] = useState(0);
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
            Patient
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
            Doctor
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
            Admin
          </label>
          <input type="radio" name="role" id="admin" required />
        </span>
      </div>

      <Link
        to={
          select == 2
            ? "/create-doctor"
            : select == 1
            ? "/create-patient"
            : "/sign-up"
        }
      >
        <button className={select == 0 ? "next disable" : "next"}>Next</button>
      </Link>
    </main>
  );
}

export default Login;
