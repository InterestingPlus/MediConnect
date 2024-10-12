import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateDoctor() {
  const navigate = useNavigate();

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
    async function localUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        console.log(`Hello, ${user.username}`);
      } else {
        console.log("Not Found!");
      }
    }

    localUser();
  }, []);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      id="create-doctor"
      onSubmit={async (e) => {
        e.preventDefault();
        const {
          username,
          password,
          name,
          age,
          specialization,
          contact,
          availability,
        } = values;

        const { data } = await axios.post(
          "http://localhost:4444/create-doctor",
          {
            username,
            password,
            name,
            age,
            specialization,
            contact,
            availability,
          }
        );

        if (data.status === false) {
          console.log("Errr :", data.msg);
        }
        if (data.status === true) {
          console.log("Signed Up Successfully");

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

          data.data.role = "D";

          localStorage.setItem("profile", JSON.stringify(data.data));

          navigate("/");

          // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          // navigate("/setAvatar");
        }
      }}
    >
      <h1>Sign Up</h1>

      <label htmlFor="username">Username : </label>
      <input
        type="text"
        name="username"
        id="username"
        value={values.username}
        onChange={(e) => handleChange(e)}
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
        required
      />

      <br />

      <input type="submit" />
    </form>
  );
}

export default CreateDoctor;
