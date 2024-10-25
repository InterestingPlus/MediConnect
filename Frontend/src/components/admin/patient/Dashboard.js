import axios from "axios";
import apiPath from "../../../isProduction";

const { useEffect, useState } = require("react");
const { useNavigate } = require("react-router-dom");

function PatientDashboard() {
  const navigate = useNavigate();
  const [localUser, setUser] = useState();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/patient-dashboard");
        setUser(user);

        const { id, username } = await user;

        const data = await axios.post(`${apiPath()}/auth-patient`, {
          id,
          username,
        });

        if (data.data.status) {
          await setPatient(data.data.data);
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
      {patient ? (
        <>
          <img
            src="https://img.freepik.com/premium-vector/patient-woman-smiling-profile-cartoon_18591-60679.jpg"
            alt="profile-pic"
          />

          <h1>
            Hello, <span> {patient?.name}. </span>
          </h1>
          <h2>
            Id : <span> {patient?._id} </span>
          </h2>
          <h2>
            Username : <span> {patient?.username} </span>
          </h2>
          <h2>
            Contact : <span> {patient?.contact} </span>
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

export default PatientDashboard;
