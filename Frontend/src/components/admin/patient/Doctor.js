import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiPath from "../../../isProduction";

function Doctor() {
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);

  const [shrink, setShrink] = useState(false);
  const [booked, setBooked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.post(`${apiPath()}/doctor`, {
        username: u,
      });

      await setDoctor(data.data.data);
    }
    getDoctor();
  }, []);

  const scrollAnimation = (e) => {
    if (e.target.scrollTop > 50) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  return (
    <main
      className="profile"
      id="book-doctor"
      onScroll={(e) => scrollAnimation(e)}
    >
      {doctor ? (
        <section className={shrink ? "shrink" : ""}>
          <div className="main">
            <img
              id="doctor-pic"
              src="https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
              alt="profile-pic"
            />

            <div>
              <h1>{doctor.name}</h1>
              <h2>{doctor.username}</h2>
            </div>
          </div>

          <div className="top">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <h3>
              Specialization : <span> {doctor.specialization} </span>
            </h3>
            <h3>
              Contact : <span> +{doctor.contact} </span>
            </h3>
            <h3>
              Age : <span> {doctor.age} </span>
            </h3>
            <h3>
              Availability : <span> {doctor.availability} </span>
            </h3>

            <button
              className="aptmnt"
              onClick={() => {
                setBooked(true);

                setTimeout(() => {
                  navigate(
                    `/patient-dashboard/appointments/book-next/${doctor.username}`
                  );
                }, 500);
              }}
            >
              {booked ? "Booking..." : "Book Appointment"}
            </button>

            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vitae
              modi magni nihil iusto veritatis repellendus? Modi tempora
              molestiae inventore placeat delectus saepe illo? Suscipit ut
              deleniti aut nobis est!
            </p>
            <br />

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur totam harum eveniet exercitationem, enim dolore
              placeat temporibus cupiditate, aperiam incidunt et quidem, vero
              dolorum delectus ipsa magni vel architecto. Officia.
            </p>
          </div>
        </section>
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1>Fetching Doctor Details...</h1>
        </div>
      )}
    </main>
  );
}

export default Doctor;
