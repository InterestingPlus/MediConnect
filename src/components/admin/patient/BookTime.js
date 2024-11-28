import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";

function BookTime() {
  const navigate = useNavigate();
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState();
  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [reason, setReason] = useState();

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.post(`${apiPath()}/doctor`, {
        username: u,
      });

      await setDoctor(data.data.data);
    }
    getDoctor();

    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        setPatient(user);

        const { id, username } = await user;

        const data = await axios.post(`${apiPath()}/auth-patient`, {
          id,
          username,
        });

        if (data.data.status) {
          await setPatient(data.data.data);
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } else {
        navigate("/");
      }
    }
    checkLocalUser();
  }, []);

  async function bookAppointment(e) {
    e.preventDefault();

    const appointmentData = {
      doctorId: doctor._id,
      patientId: patient._id,
      time,
      date,
      reason,
    };

    const { data } = await axios.post(
      `${apiPath()}/create-appointment`,
      appointmentData
    );

    if (data.status === false) {
      console.log("Err :", data.msg);
    }
    if (data.status === true) {
      setTime("");
      setDate("");
      setReason("");

      alert("Appointment Booked Successfully");

      navigate("/patient-dashboard/appointments");
    }
  }

  return (
    <section className="date">
      <h1>Schedule Appointment : </h1>
      <br />
      <form onSubmit={bookAppointment}>
        <label htmlFor="date">Select Date :</label>
        <br />
        <br />
        <input
          type="date"
          className="booktime"
          id="date"
          value={date}
          onInput={(e) => setDate(e.target.value)}
          required
        />

        <br />
        <br />

        <label htmlFor="time">Select Time :</label>
        <br />
        <br />
        <input
          type="time"
          className="booktime"
          id="time"
          value={time}
          onInput={(e) => setTime(e.target.value)}
          required
        />

        <br />
        <br />

        <label htmlFor="reason">Describe Reason :</label>
        <br />
        <br />
        <textarea
          id="reason"
          value={reason}
          onInput={(e) => setReason(e.target.value)}
          placeholder="What is your Decease"
          required
        ></textarea>

        <br />
        <br />

        <input type="submit" />
      </form>
    </section>
  );
}

export default BookTime;
