import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../isProduction";
import TimeSlotScheduler from "./TimeSlotScheduler";
import "./Create.scss";

function CreateDoctor() {
  const navigate = useNavigate();

  const [ifDisabled, setIfDisabled] = useState(false);

  const [constOtp, setconstOTP] = useState("");
  const [otp, setOTP] = useState("");
  const [verified, setVerified] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [eye, setEye] = useState(true);

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

  function nameValidation(e) {
    const value = e.target.value;

    const sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");

    setValues((prev) => {
      prev.name = sanitizedValue;
      return prev;
    });
  }

  const handleSendOTP = async () => {
    try {
      if (!values.username) {
        alert("Please enter your email.");
        return;
      }

      alert("We Sending a Verification Code to Your Email...!");
      setShowMessage(true);
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
      setShowMessage(false);
      alert("An error occurred. Please try again later.");
    }
    setIfDisabled(false);
  };

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

  async function handleSubmit(e) {
    e.preventDefault();

    setIfDisabled(true);

    if (verified) {
      const { data } = await axios.post(`${apiPath()}/create-doctor`, {
        username,
        password,
        name,
        age,
        specialization,
        contact,
        availability,
        profileImg: dataUrl,
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
    } else {
      alert("Please Verify Your Email Address!");
    }

    setIfDisabled(false);

    setStage(1);
  }

  function checkError(key) {
    if (error) {
      if (values[key]?.length < 1) {
        return "blank-err";
      } else {
        return "";
      }
    }
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

            {/* Image DATA */}
            <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
              <h2>Upload Profile Photo</h2>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
              />
              {loading && <p>Processing image...</p>}
              {dataUrl && (
                <div>
                  <h3>Preview:</h3>
                  <img
                    src={dataUrl}
                    alt="Uploaded"
                    style={{
                      maxWidth: "40%",
                      marginTop: "10px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </div>
            {/* Image DATA */}

            <label htmlFor="username">Email : </label>
            <input
              type="email"
              name="username"
              id="username"
              className={`${checkError("username")}`}
              value={values.username}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled || verified}
              autoComplete="off"
              placeholder="demo@gmail.com"
              required
            />

            <label htmlFor="password">Create Password : </label>
            <div className="password">
              <input
                type={eye ? "password" : "text"}
                name="password"
                id="password"
                className={`${checkError("password")}`}
                value={values.password}
                onChange={(e) => handleChange(e)}
                disabled={ifDisabled || verified}
                autoComplete="off"
                placeholder="Create a Strong Password"
                required
              />{" "}
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
                        setShowMessage(false);
                        alert("Verified Successfully!");
                      } else {
                        setVerified(false);
                        setShowMessage(true);
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

            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`${checkError("name")}`}
              value={values.name}
              onChange={(e) => {
                handleChange(e);
                nameValidation(e);
              }}
              placeholder="Enter your Name"
              disabled={ifDisabled}
              required
            />

            <label htmlFor="age">Age : </label>
            <input
              type="number"
              name="age"
              id="age"
              className={`${checkError("age")}`}
              value={values.age}
              onChange={(e) => {
                handleChange(e);
                ageValidation(e);
              }}
              placeholder="Enter your Age"
              disabled={ifDisabled}
              required
            />

            <label htmlFor="specialization">Specialization : </label>
            <input
              type="text"
              name="specialization"
              id="specialization"
              className={`${checkError("specialization")}`}
              value={values.specialization}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled}
              placeholder="Specialization"
              required
            />

            <label htmlFor="contact">Contact : </label>
            <input
              type="number"
              name="contact"
              id="contact"
              min="1000000000"
              max="9999999999"
              className={`${checkError("contact")}`}
              value={values.contact}
              onChange={(e) => handleChange(e)}
              disabled={ifDisabled}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  setStage(2);
                }
              }}
              placeholder="Enter your Mobile Number"
              required
            />
          </div>

          <div className="stages">
            <h1>Educational Qualification</h1>

            <label for="course">Course : </label>
            <input type="text" id="course" name="course" />

            <label>Grade : </label>
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
                  formRef.current.dispatchEvent(submitEvent);
                }
              }
            }}
          >
            {stage == 3 ? "Submit" : "Next"}
          </button>
        </div>
        <p className="login-signUp">
          Already have an Account? <Link to="/login-doctor">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default CreateDoctor;
