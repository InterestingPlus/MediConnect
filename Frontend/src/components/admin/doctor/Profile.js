import axios from "axios";
import apiPath from "../../../isProduction";
import SelectLocation from "../../SelectLocation";
import TimeSlotScheduler from "../../TimeSlotScheduler";
import "../Profile.scss";

const { useEffect, useState } = require("react");
const { useNavigate } = require("react-router-dom");

function DoctorProfile() {
  const navigate = useNavigate();
  const [localUser, setUser] = useState();
  const [doctor, setDoctor] = useState(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedValues, setValues] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    country: "",
    state2: "",
    city: "",
    contact: "",
    availability: [],
  });

  async function updateUser() {
    setIsLoading(true);

    if (isUpdate) {
      if (!updatedValues?.name || !updatedValues?.contact) {
        setIsLoading(false);
        return;
      }

      try {
        let { name, contact, age, address, profileImg, availability } =
          updatedValues;

        if (updatedValues?.city) {
          address = {
            country: updatedValues.country,
            state: updatedValues.state2,
            city: updatedValues.city,
          };
        }

        const data = await axios.post(`${await apiPath()}/update-doctor`, {
          id: doctor._id,

          name,
          contact,
          age,
          address,
          profileImg,
          availability,
        });

        if (data.data.status) {
          checkLocalUser();

          setIsUpdate(false);

          alert("Your Profile Has Updated Successfully!");
        } else {
          alert("Internal Server Error");
        }
      } catch (err) {
        alert("Can not Update the Values...!");
        setIsUpdate(false);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return;
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, [isUpdate]);

  function onScheduleChange(updatedSchedule) {
    setValues({ ...updatedValues, availability: [updatedSchedule] });
  }

  function handleChange(e) {
    setValues({
      ...updatedValues,
      [e.target.name]: e.target.value,
    });
  }

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/doctor-dashboard/profile");
      setUser(user);

      const { id, username } = await user;

      const data = await axios.post(`${await apiPath()}/auth-doctor`, {
        id,
        username,
      });

      if (data.data.status) {
        await setDoctor(data.data.data);
        await setValues(data.data.data);
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/");
    }
  }

  function returnSlots() {
    const aval = doctor.availability[0]; // Assuming the first object holds the availability

    if (typeof aval !== "object" || aval === null) {
      console.error("Availability data is not an object");
      return <span>{doctor.availability}</span>;
    }

    // Render buttons for each day's slots
    return Object.entries(aval).map(([day, slots], dayIndex) => (
      <span key={dayIndex}>
        <h3>{day}</h3>
        <div>
          {slots.map((slot, slotIndex) => (
            <button key={slotIndex}>{slot}</button>
          ))}
        </div>
      </span>
    ));
  }

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

      setValues((prev) => {
        return {
          ...prev,
          profileImg: compressedDataUrl,
        };
      });

      setLoading(false);
    });
  };

  return (
    <section id="profile">
      {doctor ? (
        <>
          {isUpdate ? (
            <div className="upload">
              <h2>Upload Profile Photo</h2>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onInput={handleFileChange}
              />
              {loading && <p>Processing image...</p>}
              {dataUrl && (
                <div>
                  <h3>Preview:</h3>
                  <img src={dataUrl} alt="Uploaded" />
                </div>
              )}
            </div>
          ) : (
            <img
              className="white"
              src={
                doctor?.profileImg
                  ? doctor.profileImg
                  : doctor?.gender == "female"
                  ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                  : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
              }
              alt="profile-pic"
            />
          )}

          {isUpdate ? (
            <h2>
              Name :
              <input
                type="text"
                name="name"
                value={updatedValues?.name}
                onInput={handleChange}
              />
            </h2>
          ) : (
            <h1>
              Hello,
              <span> {doctor?.name}. </span>
            </h1>
          )}

          {!isUpdate ? (
            <h2>
              Email : <span> {doctor?.username} </span>
            </h2>
          ) : null}

          <h2>
            Contact :
            {isUpdate ? (
              <input
                type="number"
                name="contact"
                value={updatedValues?.contact}
                onInput={handleChange}
              />
            ) : (
              <span> {doctor?.contact} </span>
            )}
          </h2>

          {isUpdate ? (
            <div className="location">
              <SelectLocation setValues={setValues} />
            </div>
          ) : (
            <>
              <h2>
                Country :<span> {doctor?.address?.country} </span>
              </h2>
              <h2>
                State :<span> {doctor?.address?.state} </span>
              </h2>
              <h2>
                City :<span> {doctor?.address?.city} </span>
              </h2>
            </>
          )}

          {isUpdate ? (
            <TimeSlotScheduler
              onScheduleChange={onScheduleChange}
              defaultValues={doctor?.availability[0]}
            />
          ) : (
            <h2 className="availability">Availability :{returnSlots()}</h2>
          )}

          <br />

          <button
            id="edit"
            onClick={() => {
              if (isUpdate) {
                updateUser();
              } else {
                setIsUpdate(true);
              }
            }}
          >
            {isUpdate ? "Submit" : "Edit"}
            {isLoading ? "...." : ""}
          </button>

          {isUpdate ? (
            <button
              id="cancel"
              onClick={() => {
                setIsUpdate(false);
              }}
            >
              Cancel
            </button>
          ) : null}

          <br />
          <br />
          <button
            onClick={() => {
              localStorage.clear();
              checkLocalUser();
            }}
            className="logout"
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </>
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1>Fetching Your Details...</h1>
          <button
            onClick={() => {
              localStorage.clear();
              checkLocalUser();
            }}
            className="logout"
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default DoctorProfile;
