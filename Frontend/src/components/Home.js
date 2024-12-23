import { useNavigate } from "react-router-dom";
import "./Home.scss";

import Logo from "../images/White.png";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main id="home">
        <section className="hero" id="home">
          <div>
            <h1>Welcome to MediConnect</h1>
            <p>
              Connecting Care, Simplifying Health <br /> Your Health, Your Time
              – Just One Click Away.
            </p>
            <button onClick={() => navigate("/create-patient")}>
              Book an Appointment
            </button>
          </div>
          {/* <img src={myImg} alt="profile-pic" /> */}
          <dotlottie-player
            src="https://lottie.host/3ff22e7d-8fca-4dec-847e-57b1567d3307/G1G1xa1VWB.lottie"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></dotlottie-player>
        </section>

        <br />
        <hr />
        <br />
        <br />

        <section className="about">
          <div>
            <h3>
              Find Trusted Doctors, Book Appointments, and Access Your Medical
              Records – All in One Place.
            </h3>
            <br />
            <p>
              At MediConnect, we bridge the gap between patients and healthcare
              professionals by providing an efficient, seamless, and
              user-friendly platform.
              <br /> <br />
              Whether you need to consult a specialized doctor, schedule an
              appointment at your convenience, or review your medical history
              and reports online—MediConnect simplifies your healthcare journey.
              <br /> <br />
              With real-time reminders, appointment updates, and personalized
              notifications, we ensure you never miss an important visit.
              Doctors can manage their schedules, accept bookings, and provide
              detailed prescriptions with ease, enhancing the patient experience
              at every step.
              <br /> <br />
              Experience the future of healthcare with a platform designed for
              your convenience and peace of mind.
            </p>

            <h4>Simplify Your Healthcare Journey Today.</h4>
            <button
              onClick={() =>
                setTimeout(() => {
                  navigate("/create-patient");
                }, 600)
              }
            >
              Get Started Now
            </button>
          </div>
        </section>

        <section className="services" id="services">
          <div className="service">
            <span>🌟</span>
            <h3>Effortless Appointments</h3>
            <p>
              Book appointments with your trusted doctors in just a few clicks.
            </p>
          </div>
          <div className="service">
            <span>🕒</span>
            <h3>Real-Time Updates</h3>
            <p>
              Get instant notifications on appointment bookings, confirmations,
              and updates.
            </p>
          </div>
          <div className="service">
            <span>📋</span>
            <h3>All Your Medical Records</h3>
            <p>
              Access prescriptions, lab results, and billing details securely
              online.
            </p>
          </div>
          <div className="service">
            <span>👩‍⚕️</span>
            <h3>Verified Specialists</h3>
            <p>
              Connect with experienced and qualified doctors from various
              specializations.
            </p>
          </div>
          <div className="service">
            <span>📅</span>
            <h3>Manage Your Schedule</h3>
            <p>Stay organized with reminders for upcoming visits.</p>
          </div>
        </section>

        <footer>
          <img src={Logo} />
          <p>
            © 2024 MediConnect <br /> Hospital Management System <br /> | All
            Rights Reserved |
          </p>
        </footer>
      </main>
    </>
  );
}

export default Home;
