import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../isProduction";

function LoginDoctor() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);
  const [isErr, setIsErr] = useState(false);

  const [eye, setEye] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/doctor-dashboard");
      }
    }

    checkLocalUser();
  }, []);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIfDisabled(true);
    setIsErr(false);

    const { username, password } = values;

    if (true) {
      const { data } = await axios.post(`${apiPath()}/login-doctor`, {
        username,
        password,
      });

      if (data.status == false) {
        setIsErr(true);
        setIfDisabled(false);
      }
      if (data.status == true) {
        setValues({
          username: "",
          password: "",
        });
        setIfDisabled(false);

        alert("Logged in Successfully");

        localStorage.setItem("profile", JSON.stringify(data.data));

        navigate("/doctor-dashboard");
      }
    }
  }

  return (
    <main className="form">
      <form
        id="create-doctor"
        onSubmit={handleSubmit}
        className={`${ifDisabled ? "loading" : ""}`}
      >
        <h1>
          Login as <span>Doctor</span>
        </h1>

        <br />

        <label htmlFor="username">Email : </label>
        <input
          type="email"
          name="username"
          id="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
          className={isErr ? "err" : ""}
          readOnly={ifDisabled}
          required
        />

        <br />

        <div className="password">
          <label htmlFor="password">Password : </label>
          <div>
            <input
              type={eye ? "password" : "text"}
              name="password"
              id="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
              className={isErr ? "err" : ""}
              readOnly={ifDisabled}
              required
            />
            <button
              type="button"
              onClick={() => {
                setEye(!eye);
              }}
            >
              {eye ? (
                <i class="fi fi-ss-eye-crossed"></i>
              ) : (
                <i class="fi fi-ss-eye"></i>
              )}
            </button>
          </div>
        </div>

        <br />

        {isErr ? (
          <>
            <br />
            <p>UserName or Password are not Matched</p> <br />
          </>
        ) : (
          <p className="login-signUp">
            New to Here? <Link to="/create-doctor">Create Account</Link>
          </p>
        )}

        <input
          type={ifDisabled ? "button" : "submit"}
          className={ifDisabled ? "submit disable" : "submit"}
          value="submit"
        />
      </form>
    </main>
  );
}

export default LoginDoctor;
