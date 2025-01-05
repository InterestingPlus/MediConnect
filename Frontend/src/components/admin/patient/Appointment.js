import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../../../isProduction";
import "../Appointment.scss";

import { io } from "socket.io-client";

import ReviewPopup from "./ReviewPopup";

const socket = io(await apiPath());

function PatientAppointment() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(null);

  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const [userId, setUserId] = useState(false);
  const userIdRef = useRef(userId);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));
    if (user) {
      const { id, username } = await user;
      setUserId(id);
      userIdRef.current = id; // Update ref here

      const data = await axios.post(`${await apiPath()}/auth-patient`, {
        id,
        username,
      });

      if (!data.data.status) {
        localStorage.clear();
        navigate("/login");
      }

      const data2 = await axios.post(
        `${await apiPath()}/get-appointments-patient`,
        {
          patientId: id,
        }
      );

      setAppointments(data2.data.data.reverse());
      // setAppointments(data2.data.data);
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  useEffect(() => {
    socket.on("new-notification-patient", (data) => {
      console.log(data);
      if (data?.type.toLowerCase().includes("status")) {
        if (data.recipientId == userIdRef.current) {
          checkLocalUser();
        }
      } else {
        alert(data?.type.toLowerCase());
      }
    });
  }, []);

  const isNewAppointment = (createdAt) => {
    const now = Date.now();
    const createdTime = new Date(createdAt).getTime();
    const tenMinutes = 10 * 60 * 1000;
    return now - createdTime <= tenMinutes; // Check if createdAt is within the last 10 minutes
  };

  useEffect(() => {
    async function addingReview() {
      try {
        const data = await axios.post(`${await apiPath()}/check-review`, {
          userId,
        });

        if (data) {
          setShowReviewPopup(data.data.data);
        } else {
          setShowReviewPopup({});
        }
      } catch (err) {
        alert("Something Went Wrong!");
      }
    }
    addingReview();
  }, [appointments]);

  const [prescription, setViewPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrescription = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${await apiPath()}/view-prescription`,
        { id }
      );
      setViewPrescription(response.data.data);
    } catch (err) {
      setError("Error while Loading Prescription!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="appointment-header">
        <h1>
          <i class="fa-regular fa-calendar-check"></i> Appointments
        </h1>
        <Link to="/patient-dashboard/appointments/book">
          <button className="book">
            <i class="fa-regular fa-square-plus"></i> Book Appointment
          </button>
        </Link>
      </div>
      <section className="view-appointment">
        <br />
        <h2>Appointments History :</h2>
        <hr />
        {appointments ? (
          appointments.length > 0 ? (
            <ul>
              {appointments.map((app) => {
                return (
                  <li
                    key={app._id}
                    className={`${
                      isNewAppointment(app?.createdAt) ? "new" : ""
                    } ${app.status == "visited" ? "visited" : ""}`}
                  >
                    <img
                      src={
                        app?.doctorImg
                          ? app.doctorImg
                          : app.doctorGender == "female"
                          ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                          : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
                      }
                    />

                    <p>
                      <b> Doctor : </b> {app?.doctorName}
                    </p>
                    <p>
                      <b> Time : </b> {app?.time} {app.createdAt}
                    </p>
                    <p>
                      <b> Date : </b> {app?.date}
                    </p>
                    <p>
                      <b> Reason : </b> {app?.reason}
                    </p>

                    <p>
                      <b> Status : </b>

                      {app?.status == "pending" ? (
                        <b className="orange">
                          Pending <i class="fa-regular fa-clock"></i>
                        </b>
                      ) : app?.status == "accepted" ? (
                        <b className="green">
                          Accepted <i class="fa-regular fa-circle-check"></i>
                        </b>
                      ) : app?.status == "rejected" ? (
                        <b className="red">
                          Rejected <i class="fa-solid fa-ban"></i>
                        </b>
                      ) : (
                        <b className="green" style={{ color: "green" }}>
                          Visited <i class="fa-regular fa-circle-check"></i>
                        </b>
                      )}
                    </p>

                    <br />

                    {app?.status == "visited" ? (
                      app?.prescriptionId ? (
                        <button
                          onClick={() => fetchPrescription(app.prescriptionId)}
                          className="view-presc"
                        >
                          View Prescription
                        </button>
                      ) : (
                        <p className="view-presc">
                          Prescription Will be Shown Here
                        </p>
                      )
                    ) : (
                      ""
                    )}
                  </li>
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
              <h3>Not Found Any Appointment</h3>
            </div>
          )
        ) : (
          <div id="small-loading">
            <span className="animation"></span>
            <h1>Loading Appointments...</h1>
          </div>
        )}
      </section>

      {showReviewPopup ? <ReviewPopup reviewInfo={showReviewPopup} /> : <></>}

      {prescription && (
        <div id="prescription-popup">
          <button
            type="button"
            id="hide"
            onClick={() => setViewPrescription(null)}
          >
            <i className="fi fi-ss-cross-circle"></i>
          </button>
          <h2>Prescription</h2>
          <br />
          <hr />
          <br />
          {loading ? (
            <div id="small-loading">
              <span className="animation"></span>
              <h1>Loading Prescription...</h1>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              <br />
              <h4>{prescription?.title}</h4>
              <pre>{prescription?.description}</pre>
              <br />
              <a href={prescription.link}>Link: (Attachment)</a>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PatientAppointment;
