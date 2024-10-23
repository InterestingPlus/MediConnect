import axios from "axios";
import apiPath from "../../../isProduction";

const { useEffect, useState } = require("react");
const { useNavigate } = require("react-router-dom");

function DoctorDashboard() {
  const navigate = useNavigate();
  const [localUser, setUser] = useState();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/doctor-dashboard");
        setUser(user);

        const { id, username } = await user;

        const data = await axios.post(`${apiPath()}/auth-doctor`, {
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
    checkLocalUser();
  }, []);

  return (
    <>
      {doctor ? (
        <>
          <img
            src="https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
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
          <h2>
            Availability : <span> {doctor?.availability} </span>
          </h2>

          <br />
          <button id="edit">Edit</button>
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

export default DoctorDashboard;
