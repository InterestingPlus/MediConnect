import axios from "axios";
import apiPath from "../../../isProduction";

const { useEffect, useState } = require("react");
const { useNavigate, Link } = require("react-router-dom");

function PatientDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/patient-dashboard/dashboard");

        const data = await axios.get(`${apiPath()}/top-doctor`);

        setDoctors(data.data.data);

        console.log(doctors);
      } else {
        navigate("/login");
      }
    }
    checkLocalUser();
  }, []);

  return (
    <>
      <h1> Dashboard </h1>

      <span className="top-ten">
        <h3> Top 10 Doctors </h3>
        <Link to="/patient-dashboard/appointments/book">View All</Link>
      </span>

      {doctors ? (
        <ul id="all-doctors">
          {doctors.map((doctor, index) => {
            return (
              <Link
                to={`/patient-dashboard/appointments/doctor/${doctor.username}`}
              >
                <li key={index}>
                  <img
                    src={
                      doctor?.profileImg
                        ? doctor.profileImg
                        : "https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
                    }
                    alt="profile-pic"
                  />
                  <span>
                    <h1>{doctor.name}</h1>
                    <h2>{doctor.specialization}</h2>
                    <h3>Fee : {doctor?.consultationCharge}₹</h3>
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <div id="small-loading">
          <span className="animation"></span>
          <h1>Loading Appointments...</h1>
        </div>
      )}
    </>
  );
}

export default PatientDashboard;
