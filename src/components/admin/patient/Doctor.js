import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";

function Doctor() {
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.post(`${apiPath()}/doctor`, {
        username: u,
      });

      await setDoctor(data.data.data);
    }
    getDoctor();
  }, []);

  return (
    <main className="profile">
      {doctor ? (
        <section>
          <div className="main">
            <img
              src="https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
              alt="profile-pic"
            />

            <div>
              <h1>{doctor.name}</h1>
              <h2>{doctor.username}</h2>
            </div>
          </div>

          <h3>
            Specialization : <span> {doctor.specialization} </span>
          </h3>
          <h3>
            Contact : <span> +{doctor.contact} </span>
          </h3>
          <h3>
            Age : <span> {doctor.age} </span>
          </h3>
          <h3>
            Availability : <span> {doctor.availability} </span>
          </h3>
          <Link
            to={`/patient-dashboard/appointments/book-next/${doctor.username}`}
          >
            <button className="aptmnt">Book Appointment</button>
          </Link>
        </section>
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1>Fetching Doctor Details...</h1>
        </div>
      )}
    </main>
  );
}

export default Doctor;
