import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePatient() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    contact: "",
    address: "",
  });

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();
    const { username, password, name, age, contact, address } = values;

    const { data } = await axios.post("http://localhost:4444/create-doctor", {
      username,
      password,
      name,
      age,
      contact,
      address,
    });

    console.log(data);

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
        contact: "",
        address: "",
      });

      navigate("/");

      // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      // navigate("/setAvatar");
    }
  }

  return (
    <main>
      <form
        id="create-doctor"
        // onSubmit={submit}
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

        <label htmlFor="address">Address : </label>
        <input
          type="text"
          name="address"
          id="address"
          value={values.address}
          onChange={(e) => handleChange(e)}
          required
        />

        <br />

        <input type="submit" />
      </form>
    </main>
  );
}

export default CreatePatient;
