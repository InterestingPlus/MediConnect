import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Doctor.scss";

function Doctor() {
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);

  const [shrink, setShrink] = useState(false);
  const [booked, setBooked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getDoctor() {
      try {
        const data = await axios.post(`http://localhost:4444/doctor`, {
          username: u,
        });

        await setDoctor(data.data.data);
      } catch (err) {
        alert("Doctor Not Found!");
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

  return (
    <main
      className="profile"
      id="book-doctor"
      onScroll={(e) => scrollAnimation(e)}
    >
      {doctor ? (
        <>
          <section className={shrink ? "shrink" : ""}>
            <div className="main">
              <img
                className="white"
                id="doctor-pic"
                src={
                  doctor?.profileImg
                    ? doctor.profileImg
                    : doctor?.gender == "female"
                    ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                    : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
                }
                alt="profile-pic"
              />

              <div>
                <h1>Dr. {doctor.name}</h1>
                <h2>{doctor.specialization}</h2>
              </div>
            </div>

            <div className="top">
              <h2>About</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                vitae modi magni nihil iusto veritatis repellendus? Modi tempora
                molestiae inventore placeat delectus saepe illo? Suscipit ut
                deleniti aut nobis est!
              </p>
              <br />
              <h3>
                Contact : <span> +{doctor.contact} </span>
                <br /> <span> {doctor.username} </span>
              </h3>
              <h3>
                Age : <span> {doctor.age} </span>
              </h3>

              <button
                className="aptmnt"
                onClick={() => {
                  setBooked(true);

                  setTimeout(() => {
                    navigate(
                      `/patient-dashboard/appointments/book-next/${doctor.username}`
                    );
                  }, 500);
                }}
              >
                {booked ? "Booking..." : "Book Appointment"}
              </button>

              <br />
            </div>
          </section>

          <section className="profile-review" id="review">
            <h2>Reviews</h2>
            <hr />

            <br />

            {doctor?.reviews?.length > 0 ? (
              <div id="reviews">
                {doctor?.reviews?.map((review) => {
                  return (
                    <div className="review">
                      <div className="patient">
                        <img
                          src={
                            review?.patientImg
                              ? review?.patientImg
                              : review?.gender == "female"
                              ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                              : "https://cdn-icons-png.flaticon.com/512/4874/4874944.png"
                          }
                        />
                        <h2>{review?.patientName}</h2>
                      </div>

                      <div className="rating">
                        {Array.from({ length: 5 }).map((_, index) => {
                          if (index < review?.rating) {
                            return (
                              <i key={index} className="fi fi-sc-star"></i>
                            ); // Filled star
                          } else {
                            return (
                              <i key={index} className="fi fi-rr-star"></i>
                            ); // Blank star
                          }
                        })}
                      </div>

                      <div className="review-info">
                        <h2>{review?.title}</h2>
                        <p>{review?.review}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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

export default Doctor;
