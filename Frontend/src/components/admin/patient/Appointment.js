import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../../../isProduction";

function PatientAppointment() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));
      if (user) {
        const { id, username } = await user;
        const data = await axios.post(`${apiPath()}/auth-patient`, {
          id,
          username,
        });

        if (!data.data.status) {
          localStorage.clear();
          navigate("/login");
        }

        const data2 = await axios.post(
          `${apiPath()}/get-appointments-patient`,
          {
            patientId: id,
          }
        );

        setAppointments(data2.data.data.reverse());
        // setAppointments(data2.data.data);
      }
    }
    checkLocalUser();
  }, []);

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
              {appointments.map((app, key) => {
                return (
                  <li key={key}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3952/3952988.png" />

                    <p>
                      <b> Doctor : </b> {app?.doctorName}
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
                      ) : (
                        <b className="red">
                          Rejected <i class="fa-solid fa-ban"></i>
                        </b>
                      )}
                    </p>
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

export default PatientAppointment;
