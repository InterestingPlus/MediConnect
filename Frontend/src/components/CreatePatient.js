import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../isProduction";

function CreatePatient() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

  const [constOtp, setconstOTP] = useState("");
  const [otp, setOTP] = useState("");
  const [verified, setVerified] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    contact: "",
  });

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/patient-dashboard");
      }
    }

    checkLocalUser();
  }, [navigate]);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const handleSendOTP = async () => {
    try {
      if (!values.username) {
        alert("Please enter your email.");
        return;
      }

      alert("We Sending a Verification Code to Your Email...!");
      setIfDisabled(true);

      console.log(constOtp);

      const response = await axios.post(`${apiPath()}/otp-verification`, {
        email: values.username,
      });

      if (await response.data) {
        setconstOTP(response.data.otp);
      }

      if (response.data.status) {
        alert("OTP has been sent to your email.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      alert("An error occurred. Please try again later.");
    }
    setIfDisabled(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIfDisabled(true);

    if (verified) {
      const { username, password, name, age, contact } = values;

      const { data } = await axios.post(`${apiPath()}/create-patient`, {
        username,
        password,
        name,
        age,
        contact,
      });

      if (data.status === false) {
        // alert("Errr : " + data.message);
        alert("This Email-id is Already Registered! Please try Another.");
        setIfDisabled(false);
        setVerified(false);
        setconstOTP("");
        setOTP("");
      }
      if (data.status === true) {
        setValues({
          username: "",
          password: "",
          name: "",
          age: "",
          contact: "",
        });

        alert("Signed Up Successfully");

        localStorage.setItem("profile", JSON.stringify(data.data));

        navigate("/login");

        // localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
    }
    setIfDisabled(false);
  }

  return (
    <main className="form">
      <form
        id="create-doctor"
        onSubmit={handleSubmit}
        className={`${ifDisabled ? "loading" : ""}`}
      >
        <h1>
          Sign Up as a <span>Patient</span>
        </h1>

        <label htmlFor="username">Email : </label>
        <input
          type="email"
          name="username"
          id="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
          disabled={ifDisabled || verified}
          required
        />

        <br />

        <label htmlFor="password">Create Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={(e) => handleChange(e)}
          disabled={ifDisabled || verified}
          required
        />

        {verified ? (
          <p id="verified-success">Verified Successfully!</p>
        ) : (
          <>
            {constOtp ? (
              <>
                <br />

                <label htmlFor="otp">OTP : </label>
                <input
                  type="number"
                  id="otp"
                  name="otp"
                  value={otp}
                  onInput={(e) => setOTP(e.target.value)}
                />
              </>
            ) : (
              ""
            )}

            <br />

            <button
              type="button"
              id="verify"
              onClick={() => {
                if (constOtp && otp) {
                  console.log(constOtp, otp);
                  if (constOtp == otp) {
                    setVerified(true);
                    alert("Verified Successfully!");
                  } else {
                    setVerified(false);
                    alert("OTP Doesn't Match!");
                  }
                } else {
                  handleSendOTP();
                }
              }}
              disabled={ifDisabled}
            >
              {constOtp ? "Verify" : "SendOTP"}
            </button>
          </>
        )}

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

        <p className="login-signUp">
          Already have an Account? <Link to="/login-doctor">Login</Link>
        </p>

        <input
          type={ifDisabled ? "button" : verified ? "submit" : "button"}
          className={ifDisabled ? "submit disable" : "submit"}
          value="submit"
        />
      </form>
    </main>
  );
}

export default CreatePatient;
