import axios from "axios";

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

        const data = await axios.get(`http://localhost:4444/top-doctor`);

        setDoctors(data.data.data);
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
        <h3> Top Doctors </h3>
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
      ) : (
        <div id="small-loading">
          <span className="animation"></span>
          <h1>Loading Doctors...</h1>
        </div>
      )}
    </>
  );
}

export default PatientDashboard;
