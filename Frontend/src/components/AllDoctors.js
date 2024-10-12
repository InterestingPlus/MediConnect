import axios from "axios";
import { useEffect, useState } from "react";

function AllDoctors() {
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.get("http://localhost:4444/get-doctor");

      setDoctors(data);
    }
    getDoctor();
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
