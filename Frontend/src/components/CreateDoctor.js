import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiPath from "../isProduction";

function CreateDoctor() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

  const [stage, setStage] = useState(1);

  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    specialization: "",
    contact: "",
    availability: "",
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

    const {
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    } = values;

    const { data } = await axios.post(`${apiPath()}/create-doctor`, {
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    });

    if (data.status === false) {
      alert("Errr : " + data.message);
    }
    if (data.status === true) {
      setValues({
        username: "",
        password: "",
        name: "",
        age: "",
        specialization: "",
        contact: "",
        availability: "",
      });

      setIfDisabled(false);

      alert("Signed Up Successfully");

      localStorage.setItem("profile", JSON.stringify(data.data));

      navigate("/login");

      // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
    }
  }

  if (stage == 1) {
    return (
      <main className="form">
        <form
          id="create-doctor"
          onSubmit={handleSubmit}
          className={`${ifDisabled ? "loading" : ""}`}
        >
          <h1>
            Sign Up as a <span>Doctor</span>
          </h1>

          <label htmlFor="username">Username : </label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
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
            disabled={ifDisabled}
            required
          />

          <br />

          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
            required
          />

          <br />

          <label htmlFor="age">Age : </label>
          <input
            type="number"
            name="age"
            id="age"
            value={values.age}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
            required
          />

          <br />

          <label htmlFor="specialization">Specialization : </label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            value={values.specialization}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
            required
          />

          <br />

          <label htmlFor="contact">Contact : </label>
          <input
            type="number"
            name="contact"
            id="contact"
            value={values.contact}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
            required
          />

          <br />

          <label htmlFor="availability">Availability : </label>
          <input
            type="text"
            name="availability"
            id="availability"
            value={values.availability}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled}
            required
          />

          <br />

          {/* <input
            type={ifDisabled ? "button" : "submit"}
            className={ifDisabled ? "submit disable" : "submit"}
            value="submit"
          />
    */}
          <div id="pagination">
            <button disabled>Previous</button>
            <button
              onClick={() => {
                setStage(2);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </main>
    );
  } else if (stage == 2) {
    return (
      <main>
        <form>
          <h2>Set Your Available Time</h2>

          <lable htmlFor="slot">Monday</lable>
          <input type="text" id="slot" />

          <div id="pagination">
            <button
              onClick={() => {
                setStage(1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setStage(3);
              }}
            >
              Next
            </button>
          </div>
        </form>
      </main>
    );
  } else if (stage == 3) {
    return (
      <>
        <form>
          <h2>Stage 3</h2>
          <div id="pagination">
            <button
              onClick={() => {
                setStage(2);
              }}
            >
              Previous
            </button>
            <button disabled>Next</button>
          </div>
        </form>
      </>
    );
  }
}

export default CreateDoctor;
