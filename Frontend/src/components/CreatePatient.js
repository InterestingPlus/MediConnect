import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../isProduction";
import "./Create.scss";

function CreatePatient() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

  const [constOtp, setconstOTP] = useState("");
  const [otp, setOTP] = useState("");
  const [verified, setVerified] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const [eye, setEye] = useState(true);

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

    setTimeout(() => {
      setValues({
        username: "",
        password: "",
      });
    }, 1000); // To Prevent Default AutoComplete

    checkLocalUser();
  }, [navigate]);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function nameValidation(e) {
    const value = e.target.value;

    const sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");

    setValues((prev) => {
      prev.name = sanitizedValue;
      return prev;
    });
  }

  function ageValidation() {
    if (values.age !== "") {
      const numericAge = parseInt(values.age, 10);
      if (numericAge < 1 || numericAge > 120) {
        alert("Age must be between 1 and 120.");
        setValues((prev) => {
          prev.age = "";
          return prev;
        });
      }
    }
  }

  const handleSendOTP = async () => {
    try {
      if (!values.username) {
        alert("Please enter your email.");
        return;
      }

      alert("We Sending a Verification Code to Your Email...!");
      setIfDisabled(true);
      setShowMessage(true);
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
      setShowMessage(false);
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
        profileImg: dataUrl,
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
    } else {
      alert("Please, Verify your Email First!");
    }
    setIfDisabled(false);
  }

  // Image Data URL Generating
  const [dataUrl, setDataUrl] = useState(null); // Stores the Data URL
  const [loading, setLoading] = useState(false);

  // Compress the image using <canvas>
  const compressImage = (file, maxWidth, maxHeight, quality, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create an off-screen canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate the new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the resized image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a Data URL (Base64) with the desired quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality); // JPEG for compression
        callback(compressedDataUrl);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    // Only allow JPG and PNG files
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }

    setLoading(true);

    // Compress the image before generating the Data URL
    compressImage(file, 800, 800, 0.8, (compressedDataUrl) => {
      setDataUrl(compressedDataUrl); // Save the compressed Data URL
      setLoading(false);
    });
  };

  return (
    <main className="form create-patient">
      <form
        id="create-doctor"
        onSubmit={handleSubmit}
        className={`${ifDisabled ? "loading" : ""}`}
      >
        <h1>
          Sign Up as a <span>Patient</span>
        </h1>

        {/* Image DATA */}
        <div className="upload">
          <h2>Upload and Convert Image to Data URL</h2>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
          {loading && <p>Processing image...</p>}
          {dataUrl && (
            <div>
              <h3>Preview:</h3>
              <img src={dataUrl} alt="Uploaded" />
            </div>
          )}
        </div>
        {/* Image DATA */}

        <label htmlFor="username">Email : </label>
        <input
          type="email"
          name="username"
          id="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
          disabled={ifDisabled || verified}
          placeholder="demo@gmail.com"
          required
        />

        <label htmlFor="password">Create Password : </label>
        <div className="password">
          <input
            type={eye ? "password" : "text"}
            name="password"
            id="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
            disabled={ifDisabled || verified}
            placeholder="Create a Strong Password"
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

        {showMessage && (
          <p>Check your 'Spam', if you Haven't Receive the Code </p>
        )}

        {verified ? (
          <p id="verified-success">Verified Successfully!</p>
        ) : (
          <>
            {constOtp ? (
              <>
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

            <button
              type="button"
              id="verify"
              onClick={() => {
                if (constOtp && otp) {
                  console.log(constOtp, otp);
                  if (constOtp == otp) {
                    setVerified(true);
                    alert("Verified Successfully!");
                    setShowMessage(false);
                  } else {
                    setVerified(false);
                    alert("OTP Doesn't Match!");
                    setShowMessage(true);
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

        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={(e) => {
            handleChange(e);
            nameValidation(e);
          }}
          disabled={ifDisabled}
          placeholder="Enter your Name"
          required
        />

        <label htmlFor="age">Age : </label>
        <input
          type="number"
          name="age"
          id="age"
          min="0"
          max="120"
          value={values.age}
          onChange={(e) => {
            handleChange(e);
            ageValidation(e);
          }}
          onBlur={ageValidation()}
          disabled={ifDisabled}
          placeholder="Enter your age"
          required
        />

        <label htmlFor="contact">Contact : </label>
        <input
          type="number"
          name="contact"
          id="contact"
          min="1000000000"
          max="9999999999"
          value={values.contact}
          onChange={(e) => handleChange(e)}
          disabled={ifDisabled}
          placeholder="Enter your Mobile Number"
          required
        />

        <p className="login-signUp">
          Already have an Account? <Link to="/login-patient">Login</Link>
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
