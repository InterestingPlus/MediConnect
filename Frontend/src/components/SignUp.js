import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      console.log(user);

      if (user) {
        if (user.role == "d") {
          navigate("/doctor-dashboard");
        } else if (user.role == "p") {
          navigate("/patient-dashboard");
        }
      }
    }

    checkLocalUser();
  }, []);

  return (
    <main id="sign-up">
      <h1>Join as :</h1>

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

export default SignUp;
