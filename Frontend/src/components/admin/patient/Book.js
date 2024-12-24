import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiPath from "../../../isProduction";

function AllDoctors() {
  const [doctors, setDoctors] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getDoctors() {
      const data = await axios.get(`${apiPath()}/get-doctor`);

      setDoctors(data);
    }
    getDoctors();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);

    setTimeout(() => {}, 500);
  }

  if (doctors) {
    return (
      <>
        <h1 id="list-heading">
          <b>
            <i class="fa-solid fa-user-doctor"></i> Select Doctor
          </b>{" "}
          to <br /> Book Appointment
        </h1>

        <section id="search-box">
          <div>
            <input
              type="text"
              placeholder="Search Doctor"
              value={search}
              onChange={handleSearch}
            />
            <button type="button">
              <i class="fi fi-br-search"></i>
            </button>
          </div>
        </section>

        <ul id="all-doctors">
          {doctors?.data?.data?.map((doctor, index) => {
            if (doctor.name.toLowerCase().includes(search.toLowerCase())) {
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
                    </span>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </>
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
