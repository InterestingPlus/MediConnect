import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";
import "../patient/Doctor.scss";

function Hospital() {
  const { u } = useParams();
  const [hospital, setHospital] = useState(null);

  const [shrink, setShrink] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getDoctor() {
      try {
        const data = await axios.post(`${await apiPath()}/hospital`, {
          id: u,
        });

        await setHospital(data.data.data);
      } catch (err) {
        alert("Hospital Not Found!");
        navigate("/patient-dashboard");
      }
    }
    getDoctor();
  }, []);

  const scrollAnimation = (e) => {
    if (e.target.scrollTop > 50) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  function formateDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  console.log(hospital);

  return (
    <main
      className="profile"
      id="book-doctor"
      onScroll={(e) => scrollAnimation(e)}
    >
      {hospital ? (
        <>
          <section className={shrink ? "shrink" : ""}>
            <div className="main">
              <img
                className="white"
                id="doctor-pic"
                src={
                  hospital?.profileImg
                    ? hospital.profileImg
                    : "https://cdn-icons-png.flaticon.com/512/4521/4521401.png"
                }
                alt="profile-pic"
              />

              <div>
                <h1>{hospital?.name}</h1>
              </div>
            </div>

            <div className="top">
              {hospital?.about ? (
                <>
                  <h2>About</h2>
                  <p>{hospital?.about}</p>
                  <br />
                </>
              ) : (
                ""
              )}

              <h3>
                Contact : <span> +{hospital?.contact} </span>
              </h3>

              <br />
              <h2>From : </h2>
              <h3>
                Country : <span> {hospital?.address?.country} </span>
              </h3>
              <h3>
                State : <span> {hospital?.address?.state} </span>
              </h3>
              <h3>
                City : <span> {hospital?.address?.city} </span>
              </h3>

              {hospital.createdAt ? (
                <h3>
                  Joined Date : <span> {formateDate(hospital.createdAt)} </span>
                </h3>
              ) : null}

              <button
                className="aptmnt"
                onClick={() => {
                  alert("This Feature is Under Construction!");
                }}
              >
                Book Beds
              </button>

              <br />
            </div>
          </section>

          <section className="profile-review" id="review">
            <h2>Doctors</h2>
            <hr />

            <br />

            {hospital?.doctors?.length > 0 ? (
              <ul id="all-doctors">
                {hospital?.doctors?.map((doctor, index) => {
                  return (
                    <Link
                      to={`/patient-dashboard/appointments/doctor/${doctor.doctorUsername}`}
                      key={index}
                    >
                      <li>
                        <img
                          className="white"
                          src={
                            doctor?.doctorImg
                              ? doctor.doctorImg
                              : doctor?.gender == "female"
                              ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                              : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
                          }
                          alt="profile-pic"
                        />
                        <span>
                          <h1>Dr. {doctor?.doctorName}</h1>
                          <h2>{doctor?.specialization}</h2>
                          <h3>Fee: {doctor?.consultationCharge}₹</h3>
                          <div className="rating">
                            {doctor?.rating
                              ? Array.from({ length: 5 }).map((_, index) => {
                                  if (index < doctor?.rating) {
                                    return (
                                      <i
                                        key={index}
                                        className="fi fi-sc-star"
                                      ></i>
                                    ); // Filled star
                                  } else {
                                    return (
                                      <i
                                        key={index}
                                        className="fi fi-rr-star"
                                      ></i>
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
              <div id="not-found">
                <dotlottie-player
                  src="https://lottie.host/a7a63795-79b1-422b-81fc-797d952a8682/BEHP79u2q9.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: "300px", height: "300px" }}
                  loop
                  autoplay
                ></dotlottie-player>
                <h3>Reviews Not Found</h3>
              </div>
            )}
          </section>
        </>
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1 style={{ textAlign: "center " }}>Fetching Doctor Details...</h1>
        </div>
      )}
    </main>
  );
}

export default Hospital;
