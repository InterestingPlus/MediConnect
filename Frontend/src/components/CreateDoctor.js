import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiPath from "../isProduction";
import TimeSlotScheduler from "./TimeSlotScheduler";

function CreateDoctor() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

  const [stage, setStage] = useState(1);
  const [error, setError] = useState(false);

  const formRef = useRef(null);

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

    setTimeout(() => {
      setValues({
        username: "",
        password: "",
        name: "",
        age: "",
        specialization: "",
        contact: "",
        availability: "",
      });
    }, 1000); // To Prevent Default AutoComplete

    checkLocalUser();
  }, []);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const handleScheduleUpdate = (updatedSchedule) => {
    const value = values;

    console.log(updatedSchedule);

    value.availability = updatedSchedule;
    setValues(value);

    console.log(values);
  };

  const {
    username,
    password,
    name,
    age,
    specialization,
    contact,
    availability,
  } = values;

  async function handleSubmit(e) {
    e.preventDefault();

    setIfDisabled(true);

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
      alert("Error : " + data.message);
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

      alert("Signed Up Successfully");

      localStorage.setItem("profile", JSON.stringify(data.data));

      navigate("/login");

      // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
    }

    setIfDisabled(false);

    setStage(1);
  }

  function checkError(key) {
    if (error) {
      if (values[key].length < 1) {
        return "blank-err";
      } else {
        return "";
      }
    }
  }

  return (
    <main
      className="create-doctor"
      id={stage == 1 ? "first" : stage == 2 ? "second" : "third"}
    >
      <form
        ref={formRef}
        id="create-doctor"
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`${ifDisabled ? "loading" : ""}`}
      >
        <section className="stage-container">
          <div className="stages">
            <h1>
              Sign Up as a <span>Doctor</span>
            </h1>
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              className={`${checkError("username")}`}
              value={values.username}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled}
              autoComplete="off"
              required
            />

            <br />

            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`${checkError("password")}`}
              value={values.password}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled}
              autoComplete="off"
              required
            />

            <br />

            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`${checkError("name")}`}
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
              className={`${checkError("age")}`}
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
              className={`${checkError("specialization")}`}
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
              className={`${checkError("contact")}`}
              value={values.contact}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled}
              required
            />

            <br />
          </div>

          <div className="stages">
            <h1>Educational Qualification</h1>

            <lable>Course : </lable>
            <input type="text" />

            <br />

            <lable>Grade : </lable>
            <input type="number" />
          </div>

          <div className="stages">
            <h1>
              Set Your <span>Availability</span>
            </h1>

            <TimeSlotScheduler onScheduleChange={handleScheduleUpdate} />
          </div>
        </section>

        <div id="pagination">
          <button
            type="button"
            className={stage == 1 ? "disabled" : ""}
            onClick={() => {
              if (stage == 2) {
                setStage(1);
              } else if (stage == 3) {
                setStage(2);
              } else {
                setStage(1);
              }
            }}
            ifDisabled={stage == 1}
          >
            Previous
          </button>
          <button
            type="button"
            className={stage == 3 ? "submit" : ""}
            onClick={() => {
              if (stage == 1) {
                setStage(2);
              } else if (stage == 2) {
                setStage(3);
              } else if (stage == 3) {
                setError(true);
                setStage(3);

                if (formRef.current) {
                  const submitEvent = new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                  });
                  formRef.current.dispatchEvent(submitEvent); // Dispatch the submit event
                }
              }
            }}
          >
            {stage == 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateDoctor;
