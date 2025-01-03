import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import ai from "../../../images/stars.png";
import apiPath from "../../../isProduction";
import "../Appointment.scss";
import "./Prescription.scss";

const socket = io(await apiPath());

function DoctorAppointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(null);
  const [localId, setLocalId] = useState(false);
  const [reason, setReason] = useState(false);

  const [userId, setUserId] = useState(false);
  const userIdRef = useRef(userId);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      const { id, username } = await user;
      setUserId(id);
      userIdRef.current = id; // Update ref here

      setLocalId(id);

      const data = await axios.post(`${await apiPath()}/auth-doctor`, {
        id,
        username,
      });

      if (!data.data.status) {
        localStorage.clear();
        navigate("/login");
      }

      const data2 = await axios.post(
        `${await apiPath()}/get-appointments-doctor`,
        {
          doctorId: id,
        }
      );

      setAppointments(data2.data.data.reverse());
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  useEffect(() => {
    socket.on("new-notification-doctor", (data) => {
      console.log(data);
      if (data?.type == "new Appointment") {
        if (data.recipientId == userIdRef.current) {
          checkLocalUser();
        }
      } else {
        alert(data?.type.toLowerCase());
      }
    });
  }, []);

  async function updateStatus(appId, status, app) {
    const data = await axios.post(`${await apiPath()}/update-status`, {
      id: appId,
      status,
      senderId: localId,
    });

    if (data.status) {
      alert("Updated...!");

      // const notification = {
      //   recipientId: data.data.data.patientId,
      //   recipientType: "patient",
      //   type: "Status Updated!",
      //   message: `Your Status for Appointment Has ${status}`,
      // };

      // socket.emit("status", notification);
      socket.emit("patient", data.data.data);

      checkLocalUser();
    } else {
      alert("Something Went Wrong!");
    }
  }

  // Add Prescription
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptionPopup, setPrescriptionPopup] = useState(false);
  const [preValues, setPreValues] = useState({
    title: "",
    description: "",
    link: "",
  });

  function handlePreChange(e) {
    setPreValues({
      ...preValues,
      [e.target.name]: e.target.value,
    });
  }

  async function addPrescription() {
    setIsLoading(true);

    if (!preValues.title || !preValues.description) {
      alert("Please add the Required Details");
      return;
    }

    const { title, description, link } = preValues;

    try {
      const data = await axios.post(`${await apiPath()}/add-prescription`, {
        appId: prescriptionPopup,
        title,
        description,
        link,
      });

      if (data.data.status) {
        checkLocalUser();

        setPrescriptionPopup(false);
        alert("Prescription Added!");
      } else {
        alert("Error while Adding Prescription!");
      }
    } catch (err) {
      alert("Can't Add Prescription!");
    }
    setIsLoading(false);
  }

  async function getSuggestions() {
    setIsLoading(true);

    try {
      const data = await axios.post(`${await apiPath()}/diet-suggestions`, {
        doctorId: localId,
        reason: reason,
      });

      checkLocalUser();

      const formattedSuggestions = data.data.data
        .map((item) => item.suggestion) // Extract the 'suggestion' field
        .join("\n\n");

      setPreValues((prevValues) => ({
        ...prevValues,
        description: formattedSuggestions,
      }));
    } catch (err) {
      alert("Can't Add Prescription!");
    }
    setIsLoading(false);
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
                          : app?.gender == "female"
                          ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                          : "https://cdn-icons-png.flaticon.com/512/4874/4874944.png"
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

                    {app?.prescriptionId}
                    {app?.status == "visited" ? (
                      app?.prescriptionId ? (
                        <Link to={`/prescription/${app.prescriptionId}`}>
                          View Prescription
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            setPrescriptionPopup(app?._id);
                            setReason(app?.reason);
                          }}
                          id="add"
                        >
                          Add Prescription
                        </button>
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

        {prescriptionPopup ? (
          <div id="prescription-popup">
            <button
              type="button"
              id="hide"
              onClick={() => {
                setPrescriptionPopup(false);
              }}
            >
              <i class="fi fi-ss-cross-circle"></i>
            </button>

            <h2>Prescription</h2>

            <br />

            <div>
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Prescription Title"
                value={preValues.title}
                onInput={handlePreChange}
              />

              <label htmlFor="description">Description :</label>
              <textarea
                name="description"
                id="description"
                placeholder="Prescription Content"
                value={preValues.description}
                onInput={handlePreChange}
              ></textarea>

              <label htmlFor="link">Link : (Attachment)</label>
              <input
                type="url"
                name="link"
                id="link"
                placeholder="https://your-doc.com"
                value={preValues.link}
                onInput={handlePreChange}
              />

              <div className="buttons">
                <button
                  onClick={addPrescription}
                  className="add-presc"
                  disabled={isLoading}
                >
                  {!isLoading ? "Add" : "Adding..."}
                </button>
                <button
                  onClick={getSuggestions}
                  className="suggest"
                  disabled={isLoading}
                >
                  {!isLoading ? "Suggest" : "Generating..."}
                  <img src={ai} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default DoctorAppointment;
