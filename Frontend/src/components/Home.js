import { useNavigate } from "react-router-dom";
import myImg from "../doctor.png";

function Home() {
  const navigate = useNavigate();

  // gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   gsap.from("#services div", {
  //     y: 100,
  //     scale: 0,
  //     opacity: 0,
  //     duration: 0.7,
  //   });

  //   gsap.to("#services #one", {
  //     y: 0,
  //     scale: 1,
  //     opacity: 1,
  //     background: "#fff",
  //     duration: 0.7,

  //     scrollTrigger: {
  //       trigger: "#services #one",
  //       scroller: "#home",
  //       start: "250 bottom",
  //       // markers: true,
  //       // end: "300px bottom",
  //     },
  //   });
  //   gsap.to("#services #two", {
  //     y: 0,
  //     scale: 1,
  //     opacity: 1,
  //     background: "#fff",
  //     duration: 0.7,

  //     scrollTrigger: {
  //       trigger: "#services #two",
  //       scroller: "#home",
  //       start: "250 bottom",
  //     },
  //   });
  //   gsap.to("#services #three", {
  //     y: 0,
  //     scale: 1,
  //     opacity: 1,
  //     background: "#fff",
  //     duration: 0.7,

  //     scrollTrigger: {
  //       trigger: "#services #three",
  //       scroller: "#home",
  //       start: "250 bottom",
  //     },
  //   });
  // }, []);

  return (
    <>
      <main id="home">
        <section className="hero" id="home">
          <div>
            <h1>Welcome to Our Hospital</h1>
            <p>
              We are committed to providing the best healthcare services to our
              patients.
            </p>
            <button onClick={() => navigate("/create-patient")}>
              Book an Appointment
            </button>
          </div>
          <img src={myImg} alt="profile-pic" />
        </section>

        <section className="services" id="services">
          <div className="service" id="one">
            <h3>24/7 Emergency Care</h3>
            <p>
              Our emergency services are available round the clock to assist you
              in critical situations.
            </p>
          </div>
          <div className="service" id="two">
            <h3>Expert Doctors</h3>
            <p>
              Our team of highly skilled doctors are specialists in various
              fields of medicine.
            </p>
          </div>
          <div className="service" id="three">
            <h3>Advanced Technology</h3>
            <p>
              We use state-of-the-art technology to provide you with the best
              healthcare solutions.
            </p>
          </div>
        </section>
        <footer>
          <p>© 2024 Hospital Management System | All Rights Reserved</p>
        </footer>
      </main>
    </>
  );
}

export default Home;
