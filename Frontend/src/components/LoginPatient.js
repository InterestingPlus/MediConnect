import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPatient() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();

    setIfDisabled(true);

    alert("The Patient Sign-up Feature is Under Construction");

    // const { username, password, name, age, contact, address } = values;

    // const { data } = await axios.post("http://localhost:4444/create-doctor", {
    //   username,
    //   password,
    //   name,
    //   age,
    //   contact,
    //   address,
    // });

    // console.log(data);

    // if (data.status === false) {
    //   console.log("Errr :", data.msg);
    // }
    // if (data.status === true) {
    //   console.log("Signed Up Successfully");

    //   setValues({
    //     username: "",
    //     password: "",
    //     name: "",
    //     age: "",
    //     contact: "",
    //     address: "",
    //   });

    //   navigate("/");

    // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
    // navigate("/setAvatar");
  }

  return (
    <main>
      <form id="create-doctor" onSubmit={handleSubmit}>
        <h1>
          Login as <span>Patient</span>
        </h1>

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

        <input
          type={ifDisabled ? "button" : "submit"}
          className={ifDisabled ? "submit disable" : "submit"}
          value="submit"
        />
      </form>
    </main>
  );
}

export default LoginPatient;
