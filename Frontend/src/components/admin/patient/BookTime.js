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

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
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

  function returnSlots() {
    if (!doctor || !doctor.availability) {
      return <p>Loading slots...</p>;
    }

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = new Date(date).getDay();
    const aval = doctor.availability[0][days[day]];

    console.log(aval, days[day]);

    return aval.map((slot, slotIndex) => (
      <button type="button" key={slotIndex}>
        {slot}
      </button>
    ));
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

        <section id="time-slots">
          <h2></h2>

          {returnSlots()}
        </section>

        <br />
        <br />

        <input type="submit" />
      </form>
    </section>
  );
}

export default BookTime;
