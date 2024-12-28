import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import apiPath from "../../../isProduction";
import "../Appointment.scss";

const socket = io(apiPath());

function DoctorAppointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(null);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      const { id, username } = await user;
      const data = await axios.post(`${apiPath()}/auth-doctor`, {
        id,
        username,
      });

      if (!data.data.status) {
        localStorage.clear();
        navigate("/login");
      }

      const data2 = await axios.post(`${apiPath()}/get-appointments-doctor`, {
        doctorId: id,
      });

      setAppointments(data2.data.data.reverse());
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  async function updateStatus(appId, status, app) {
    const data = await axios.post(`${apiPath()}/update-status`, {
      id: appId,
      status,
    });

    if (data.status) {
      alert("Updated...!");

      const notification = {
        recipientId: data.data.data.patientId,
        recipientType: "patient",
        type: "Status Updated!",
        message: `Your Status for Appointment Has ${status}`,
      };

      socket.emit("status", notification);

      checkLocalUser();
    } else {
      alert("Something Went Wrong!");
    }
  }

  return (
    <>
      <h1>
        <i class="fa-regular fa-calendar-check"></i> Appointments :
      </h1>

      <section className="view-appointment" id="doctor">
        <br />
        <h2>Scheduled Appointments :</h2>
        <hr />
        {appointments ? (
          appointments.length > 0 ? (
            <ul>
              {appointments?.map((app, key) => {
                return (
                  <li key={key}>
                    {app?.status == "accepted" ? (
                      <input
                        type="checkbox"
                        onClick={() => {
                          const confirmVisited = window.confirm(
                            "Are you Sure to Mark as Visited?"
                          );

                          if (confirmVisited) {
                            updateStatus(app._id, "visited");
                          }
                        }}
                        value={app?.status == "visited"}
                        checked={app?.status == "visited"}
                        disabled={app?.status == "visited"}
                      />
                    ) : app?.status == "visited" ? (
                      <input type="checkbox" checked="true" disabled />
                    ) : (
                      ""
                    )}

                    <img
                      src={
                        app?.patientImg
                          ? app.patientImg
                          : "https://cdn-icons-png.flaticon.com/512/3952/3952988.png"
                      }
                    />

                    <p>
                      <b> Patient : </b> {app?.patientName}
                    </p>
                    <p>
                      <b> Time : </b> {app?.time}
                    </p>
                    <p>
                      <b> Date : </b> {app?.date}
                    </p>
                    <p>
                      <b> Reason : </b> {app?.reason}
                    </p>
                    <br />
                    <p>
                      <b> Status : </b>
                      {app?.status != "visited" ? (
                        <select
                          className={
                            app?.status == "pending"
                              ? "pending"
                              : app?.status == "accepted"
                              ? "accepted"
                              : "rejected"
                          }
                          onChange={(e) => {
                            updateStatus(app._id, e.target.value, app);
                            checkLocalUser();
                          }}
                          disabled={app.status !== "pending"}
                        >
                          <option
                            className="orange"
                            selected={app?.status == "pending"}
                            value="pending"
                          >
                            Pending <i class="fa-regular fa-clock"></i>
                          </option>
                          <option
                            className="green"
                            selected={app?.status == "accepted"}
                            value="accepted"
                          >
                            Accepted <i class="fa-regular fa-circle-check"></i>
                          </option>
                          <option
                            className="red"
                            selected={app?.status == "rejected"}
                            value="rejected"
                          >
                            Rejected <i class="fa-solid fa-ban"></i>
                          </option>
                        </select>
                      ) : (
                        <span style={{ color: "green" }}>Visited</span>
                      )}
                    </p>
                    <br />

                    {app?.status == "visited" ? (
                      app?.prescription ? (
                        <Link to="">View Prescription</Link>
                      ) : (
                        <Link to="">Add Prescription</Link>
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
    </>
  );
}

export default DoctorAppointment;
