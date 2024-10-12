import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <main id="home">
      <section class="hero" id="home">
        <h1>Welcome to Our Hospital</h1>
        <p>
          We are committed to providing the best healthcare services to our
          patients.
        </p>
        <button onClick={() => navigate("/create-patient")}>
          Book an Appointment
        </button>
      </section>

      <section class="services" id="services">
        <div class="service">
          <h3>24/7 Emergency Care</h3>
          <p>
            Our emergency services are available round the clock to assist you
            in critical situations.
          </p>
        </div>
        <div class="service">
          <h3>Expert Doctors</h3>
          <p>
            Our team of highly skilled doctors are specialists in various fields
            of medicine.
          </p>
        </div>
        <div class="service">
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
  );
}

export default Home;
