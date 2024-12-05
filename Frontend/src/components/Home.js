import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
