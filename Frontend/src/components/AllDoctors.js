import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiPath from "../isProduction";

function AllDoctors() {
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    async function getDoctors() {
      const data = await axios.get(`${await apiPath()}/get-doctor`);

      setDoctors(data);
    }
    getDoctors();
  }, []);

  if (doctors) {
    return (
      <ul id="all-doctors">
        {doctors.data.data.map((doctor, index) => {
          return (
            <li key={index}>
              <img
                src="https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
                alt="profile-pic"
              />
              <h1>{doctor.name}</h1>
              <h2>{doctor.specialization}</h2>
              <h3>{doctor.availability}</h3>
              <div>
                <Link to={`/doctor/${doctor.username}`}>
                  <button>View Detail</button>
                </Link>
                <Link to="/sign-up">
                  <button className="aptmnt">Book Appointment</button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <div id="loading">
        <span className="animation"></span>
        <h1>Fetching All Doctors...</h1>
      </div>
    );
  }
}

export default AllDoctors;
