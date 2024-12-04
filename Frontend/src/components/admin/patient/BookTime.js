import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";

import Afternoon from "../../../images/afternoon.png";
import Morning from "../../../images/morning.png";
import Evening from "../../../images/night.png";

function BookTime() {
  const navigate = useNavigate();
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState();
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [reason, setReason] = useState();

  const [selectedSlot, setSelectedSlot] = useState("");
  const isToday = new Date().toDateString() === new Date(date).toDateString();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.post(`${apiPath()}/doctor`, {
        username: u,
      });

      console.log(data);

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

    let isConfirm = false;
    if (selectedSlot) {
      isConfirm = window.confirm("Confirm to Book Appointment? ");
      console.log(selectedSlot);
    }

    if (isConfirm) {
      const appointmentData = {
        doctorId: doctor._id,
        patientId: patient._id,
        time: selectedSlot,
        date,
        reason,
      };

      console.log(appointmentData);

      const { data } = await axios.post(
        `${apiPath()}/create-appointment`,
        appointmentData
      );

      if (data.status === false) {
        console.log("Err :", data.msg);
      }
      if (data.status === true) {
        setSelectedSlot("");
        setDate("");
        setReason("");

        alert("Appointment Booked Successfully");

        navigate("/patient-dashboard/appointments");
      }
    }
  }

  const isPastSlot = (slot) => {
    if (!isToday) return false; // If not today, no need to disable
    const [slotHours, slotMinutes] = slot.split(":").map(Number);
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    return (
      slotHours < currentHours ||
      (slotHours === currentHours && slotMinutes < currentMinutes)
    );
  };

  function returnSlots() {
    if (!doctor || !doctor.availability) {
      return <p>Loading slots...</p>;
    }

    const day = new Date(date).getDay();
    const aval = doctor.availability[0][days[day]];

    // Categories for different times of the day
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    // Categorize the slots
    aval.forEach((slot) => {
      const [hours, minutes] = slot.split(":").map(Number); // Split and convert to numbers
      if (hours >= 6 && hours < 12) {
        morningSlots.push(slot);
      } else if (hours >= 12 && hours < 18) {
        afternoonSlots.push(slot);
      } else {
        eveningSlots.push(slot);
      }
    });

    // Render the categorized slots
    return (
      <div className="slot-container">
        {morningSlots.length > 0 && (
          <div>
            <h3>
              <img src={Morning} />
              Morning
            </h3>
            <div className="slots">
              {morningSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    !isPastSlot(slot) && setSelectedSlot(slot);
                    setReason("Demo Test");
                  }}
                  disabled={isPastSlot(slot)}
                  className={selectedSlot === slot ? "selected" : ""}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {afternoonSlots.length > 0 && (
          <div>
            <h3>
              <img src={Afternoon} />
              Afternoon
            </h3>
            <div className="slots">
              {afternoonSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    !isPastSlot(slot) && setSelectedSlot(slot);
                    setReason("Demo Test");
                  }}
                  disabled={isPastSlot(slot)}
                  className={selectedSlot === slot ? "selected" : ""}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {eveningSlots.length > 0 && (
          <div>
            <h3>
              <img src={Evening} />
              Evening
            </h3>
            <div className="slots">
              {eveningSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    !isPastSlot(slot) && setSelectedSlot(slot);
                    setReason("Demo Test");
                  }}
                  disabled={isPastSlot(slot)}
                  className={selectedSlot === slot ? "selected" : ""}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="date">
      <h1>Schedule Appointment : </h1>

      <form onSubmit={bookAppointment}>
        <label htmlFor="date">Select Date :</label>

        <input
          type="date"
          className="booktime"
          id="date"
          value={date}
          onInput={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />

        <section id="time-slots">
          <h2>
            {new Date().getDate() == new Date(date).getDate() &&
            new Date().getMonth() == new Date(date).getMonth()
              ? `Today, ${new Date().getDate()} ${
                  months[new Date().getMonth()]
                }`
              : new Date().getDate() + 1 == new Date(date).getDate() &&
                new Date().getMonth() == new Date(date).getMonth()
              ? `Tom, ${new Date(date).getDate()} ${
                  months[new Date(date).getMonth()]
                }`
              : `${days[new Date().getDay() + 1]}, ${new Date(
                  date
                ).getDate()} ${months[new Date(date).getMonth()]}`}
          </h2>

          {returnSlots()}
        </section>

        <input type="submit" />
      </form>
    </section>
  );
}

export default BookTime;
