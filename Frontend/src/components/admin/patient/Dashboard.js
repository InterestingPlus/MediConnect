import axios from "axios";
import apiPath from "../../../isProduction";

const { useEffect, useState } = require("react");
const { useNavigate, Link } = require("react-router-dom");

function PatientDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/patient-dashboard/dashboard");

        try {
          const data = await axios.get(`${await apiPath()}/top-doctor`);
          setDoctors(data.data.data);
        } catch (err) {
          alert("Can't Load Doctors!");
        }

        try {
          const hospitals = await axios.get(`${await apiPath()}/top-hospitals`);
          setHospitals(hospitals.data.data);
        } catch (err) {
          alert("Can't Load Hospitals!");
        }
      } else {
        navigate("/login");
      }
    }
    checkLocalUser();
  }, []);

  return (
    <>
      <h1> Dashboard </h1>
      <hr />

      <span className="top-ten">
        <h3> Top Hospitals </h3>
      </span>

      {hospitals ? (
        <>
          <ul id="all-doctors">
            {hospitals.map((hospital, index) => {
              return (
                <Link
                  to={`/patient-dashboard/hospital/${hospital._id}`}
                  key={index}
                >
                  <li key={index}>
                    <img
                      src={
                        hospital?.profileImg
                          ? hospital.profileImg
                          : "https://cdn-icons-png.flaticon.com/512/4521/4521401.png"
                      }
                      alt="profile-pic"
                    />
                    <span>
                      <h1>{hospital?.name}</h1>
                      <div className="rating">
                        {hospital?.avgRating
                          ? Array.from({ length: 5 }).map((_, index) => {
                              if (index < Math.floor(hospital?.avgRating)) {
                                return (
                                  <i key={index} className="fi fi-sc-star"></i>
                                ); // Filled star
                              } else {
                                return (
                                  <i key={index} className="fi fi-rr-star"></i>
                                ); // Blank star
                              }
                            })
                          : ""}
                      </div>
                      <h2>State: {hospital?.address?.state}</h2>
                      <h2>City: {hospital?.address?.city}</h2>
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <Link to="/patient-dashboard/all-hospitals" className="view-all">
            View All
          </Link>
        </>
      ) : (
        <div id="small-loading">
          <span className="animation"></span>
          <h1>Loading Hospitals...</h1>
        </div>
      )}

      <br />
      <br />

      <span className="top-ten">
        <h3> Top Doctors </h3>
      </span>

      {doctors ? (
        <>
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
                          : doctor?.gender == "female"
                          ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                          : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
                      }
                      alt="profile-pic"
                    />
                    <span>
                      <h1>Dr. {doctor?.name}</h1>
                      <h2>{doctor?.specialization}</h2>
                      <h3>Fee: {doctor?.consultationCharge}₹</h3>
                      <div className="rating">
                        {doctor?.avgRating
                          ? Array.from({ length: 5 }).map((_, index) => {
                              if (index < doctor?.avgRating) {
                                return (
                                  <i key={index} className="fi fi-sc-star"></i>
                                ); // Filled star
                              } else {
                                return (
                                  <i key={index} className="fi fi-rr-star"></i>
                                ); // Blank star
                              }
                            })
                          : ""}
                      </div>
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <Link to="/patient-dashboard/appointments/book" className="view-all">
            View All
          </Link>
        </>
      ) : (
        <div id="small-loading">
          <span className="animation"></span>
          <h1>Loading Doctors...</h1>
        </div>
      )}

      <br />
      <br />
    </>
  );
}

export default PatientDashboard;
