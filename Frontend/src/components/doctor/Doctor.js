import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Doctor() {
  const { u } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.post("http://localhost:4444/doctor", {
        username: u,
      });

      await setDoctor(data.data.data);
    }
    getDoctor();
  }, []);

  console.log(doctor);

  return (
    <main className="profile">
      <section>
        <div className="main">
          <img
            src="https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
            alt="profile-pic"
          />

          <div>
            <h1>{doctor?.name}</h1>
            <h2>{doctor?.username}</h2>
          </div>
        </div>

        <h3>
          Specialization : <span> {doctor?.specialization} </span>
        </h3>
        <h3>
          Contact : <span> +{doctor?.contact} </span>
        </h3>
        <h3>
          Age : <span> {doctor?.age} </span>
        </h3>
        <h3>
          Availability : <span> {doctor?.availability} </span>
        </h3>
      </section>
    </main>
  );
}

export default Doctor;
