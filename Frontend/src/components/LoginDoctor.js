import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginDoctor() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);
  const [isErr, setIsErr] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/dashboard");
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
      const { data } = await axios.post("http://localhost:4444/login-doctor", {
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

        data.data.role = "d";

        localStorage.setItem("profile", JSON.stringify(data.data));

        navigate("/dashboard");

        // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
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

        <label htmlFor="username">Username : </label>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
          className={isErr ? "err" : ""}
          required
        />

        <br />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={(e) => handleChange(e)}
          className={isErr ? "err" : ""}
          required
        />

        <br />

        {isErr ? (
          <>
            <br />
            <p>UserName or Password are not Matched</p> <br />
          </>
        ) : (
          ""
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
