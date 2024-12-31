import axios from "axios";
import apiPath from "../../../isProduction";

const { useEffect, useState } = require("react");
const { useNavigate } = require("react-router-dom");

function DoctorProfile() {
  const navigate = useNavigate();
  const [localUser, setUser] = useState();
  const [doctor, setDoctor] = useState(null);

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
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  function returnSlots() {
    const aval = doctor.availability[0]; // Assuming the first object holds the availability

    // Ensure `aval` is an object
    if (typeof aval !== "object" || aval === null) {
      console.error("Availability data is not an object");
      return <span>{doctor.availability}</span>;
    }

    // Render buttons for each day's slots
    return Object.entries(aval).map(([day, slots], dayIndex) => (
      <span key={dayIndex}>
        <h3>{day}</h3>
        {slots.map((slot, slotIndex) => (
          <button key={slotIndex}>{slot}</button>
        ))}
      </span>
    ));
  }

  return (
    <>
      {doctor ? (
        <>
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

          <h1>
            Hello, <span> {doctor?.name}. </span>
          </h1>
          <h2>
            Id : <span> {doctor?._id} </span>
          </h2>
          <h2>
            Username : <span> {doctor?.username} </span>
          </h2>
          <h2>
            Contact : <span> {doctor?.contact} </span>
          </h2>

          <h2>Availability :{returnSlots()}</h2>

          <br />
          <button id="edit">Edit</button>
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
        </div>
      )}
    </>
  );
}

export default DoctorProfile;
