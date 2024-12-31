import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";

import Afternoon from "../../../images/afternoon.png";
import Appointment from "../../../images/appointment.gif";
import Morning from "../../../images/morning.png";
import Evening from "../../../images/night.png";

import "./BookTime.scss";

function BookTime() {
  const navigate = useNavigate();
  const { u } = useParams();

  const [booked, setBooked] = useState(false);

  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState();
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [reason, setReason] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");
  const isToday = new Date().toDateString() === new Date(date).toDateString();

  const [bookedDateTime, setBookedDateTime] = useState([]);

  const [reasonStage, setReasonStage] = useState(false);

  const submitMp3 =
    "https://frontent-mentor-projects.netlify.app/1%20newbie/interactive-rating-component/submit.mp3";
  let sub = new Audio(submitMp3);

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
      try {
        const data = await axios.post(`${apiPath()}/doctor`, {
          username: u,
        });
        await setDoctor(data.data.data);
      } catch (err) {
        console.log("Doctor Not Found!");
      }

      try {
        const bookedAppointments = await axios.post(
          `${apiPath()}/check-booked-appointments`,
          {
            username: u,
          }
        );

        setBookedDateTime(bookedAppointments.data.data);
      } catch (err) {
        console.log("Can not Find Booked Appointments!");
      }
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

  function amPM(time) {
    const [hours, minutes] = time.split(":").map(Number);

    if (hours < 12) {
      return `${
        hours === 0 ? "12" : hours.toString().padStart(2, "0")
      }:${minutes.toString().padStart(2, "0")} AM`;
    } else {
      return `${
        hours === 12 ? "12" : (hours - 12).toString().padStart(2, "0")
      }:${minutes.toString().padStart(2, "0")} PM`;
    }
  }

  async function bookAppointment(e) {
    e.preventDefault();
    setLoading(true);

    if (reasonStage) {
      if (reason != "") {
        let isConfirm = false;
        if (selectedSlot) {
          isConfirm = window.confirm("Confirm to Book Appointment? ");
        }

        if (isConfirm) {
          const appointmentData = {
            doctorId: doctor._id,
            patientId: patient._id,
            time: selectedSlot,
            date,
            reason,
          };

          const { data } = await axios.post(
            `${apiPath()}/create-appointment`,
            appointmentData
          );

          if (data.status === false) {
            alert(
              "This Time Slot is Currently Not Available! Please Select Different Time Slot..!"
            );
          }
          if (data.status === true) {
            setBooked(true);
            sub.play();

            setTimeout(() => {
              navigate("/patient-dashboard/appointments");
            }, 4500);
          }
        }
      }
    } else if (selectedSlot) {
      setReasonStage(true);
    }
    setLoading(false);
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
      return (
        <div id="loading">
          <span className="animation"></span>
          <h1>Loading Slots...</h1>
        </div>
      );
    }

    const day = new Date(date).getDay();

    let aval;
    if (doctor?.availability.length > 0) {
      aval = doctor?.availability[0][days[day]];
    } else {
      aval = false;
    }

    // Categories for different times of the day
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    // Categorize the slots
    if (aval) {
      aval?.forEach((slot) => {
        const [hours, minutes] = slot.split(":").map(Number); // Split and convert to numbers
        if (hours >= 6 && hours < 12) {
          morningSlots.push(slot);
        } else if (hours >= 12 && hours < 18) {
          afternoonSlots.push(slot);
        } else {
          eveningSlots.push(slot);
        }
      });
    } else {
      alert("Something Went Wrong!");
      navigate("/");
    }

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
              <div className="slots">
                {morningSlots.map((slot, index) => {
                  const isBooked = bookedDateTime.some(
                    (booked) => booked.date === date && booked.time === slot
                  );

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (!isBooked && !isPastSlot(slot)) {
                          setSelectedSlot(slot);
                        }
                      }}
                      disabled={isPastSlot(slot)}
                      className={`${selectedSlot === slot ? "selected" : ""} ${
                        isBooked ? "booked" : ""
                      }`}
                      title={
                        isBooked
                          ? "Booked"
                          : isPastSlot(slot)
                          ? "Disabled"
                          : null
                      }
                    >
                      {amPM(slot)}
                    </button>
                  );
                })}
              </div>
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
              {afternoonSlots.map((slot, index) => {
                const isBooked = bookedDateTime.some(
                  (booked) => booked.date === date && booked.time === slot
                );

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (!isBooked && !isPastSlot(slot)) {
                        setSelectedSlot(slot);
                      }
                    }}
                    disabled={isPastSlot(slot)}
                    className={`${selectedSlot === slot ? "selected" : ""} ${
                      isBooked ? "booked" : ""
                    }`}
                    title={
                      isBooked ? "Booked" : isPastSlot(slot) ? "Disabled" : null
                    }
                  >
                    {amPM(slot)}
                  </button>
                );
              })}
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
              {eveningSlots.map((slot, index) => {
                const isBooked = bookedDateTime.some(
                  (booked) => booked.date === date && booked.time === slot
                );

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (!isBooked && !isPastSlot(slot)) {
                        setSelectedSlot(slot);
                      }
                    }}
                    disabled={isPastSlot(slot)}
                    className={`${selectedSlot === slot ? "selected" : ""} ${
                      isBooked ? "booked" : ""
                    }`}
                    title={
                      isBooked ? "Booked" : isPastSlot(slot) ? "Disabled" : null
                    }
                  >
                    {amPM(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="date">
      <h1>
        Schedule Appointment with <i>{doctor?.name},</i>
      </h1>

      <form onSubmit={bookAppointment}>
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
              ? `Tomorrow, ${new Date(date).getDate()} ${
                  months[new Date(date).getMonth()]
                }`
              : `${days[new Date(date).getDay()]}, ${new Date(
                  date
                ).getDate()} ${months[new Date(date).getMonth()]}`}
          </h2>

          {returnSlots()}
        </section>

        <input type="submit" />
      </form>

      {booked && (
        <div id="success-booked">
          <h2>
            Appointment Booked{" "}
            <span>
              Successfully{" "}
              <img
                src="https://web.whatsapp.com/emoji/v1/15/1/2/single/w/40/002705.png"
                id="right"
              />
            </span>
          </h2>

          <h3>
            Time : <b>{selectedSlot}</b>
          </h3>
          <h3>
            Date : <b>{date}</b>
          </h3>

          <img src={Appointment} />
          <p>
            Redirecting to the <br />{" "}
            <i class="fa-regular fa-calendar-check"></i> <b>Appointments</b>{" "}
            History...
          </p>
        </div>
      )}

      {reasonStage ? (
        <>
          <form onSubmit={bookAppointment} id="reason-from">
            <h2>Describe Your Reason : </h2>

            <textarea
              onInput={(e) => {
                setReason(e.target.value);
                setReasonStage(e.target.value);
              }}
              placeholder="Describe Your Problem!"
            ></textarea>

            {loading ? (
              <div id="loading">
                <span className="animation"></span>
              </div>
            ) : (
              <input type="submit" disabled={reason == ""} />
            )}

            <div
              id="hide"
              onClick={() => {
                setReasonStage(false);
              }}
            ></div>
          </form>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default BookTime;
