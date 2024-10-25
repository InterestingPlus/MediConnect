import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiPath from "../../../isProduction";

function DoctorAppointment() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
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
    checkLocalUser();
  }, []);

  return (
    <>
      <h1>Appointments :</h1>

      <section>
        <br />
        <h2>Scheduled Appointments :</h2>
        <hr />
        {appointments ? (
          <ul>
            {appointments.map((app, key) => {
              return (
                <li key={key}>
                  <p>
                    <b> Patient : </b> {app?.patientId}
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

export default DoctorAppointment;
