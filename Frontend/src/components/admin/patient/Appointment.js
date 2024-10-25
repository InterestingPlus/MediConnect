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
      }
    }
    checkLocalUser();
  }, []);

  return (
    <>
      <h1>Appointments</h1>
      <Link to="/patient-dashboard/appointments/book">
        <button className="book">Book Appointment</button>
      </Link>
      <section>
        <br />
        <h2>Appointments History :</h2>
        <hr />
        {appointments ? (
          <ul>
            {appointments.map((app, key) => {
              return (
                <li key={key}>
                  <p>
                    <b> Doctor : </b> {app?.doctorId}
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
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>Loading Appointments History...</h3>
        )}
      </section>
    </>
  );
}

export default PatientAppointment;
