import axios from "axios";
import { useEffect, useState } from "react";

function AllDoctors() {
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    async function getDoctor() {
      const data = await axios.get("http://localhost:4444/get-doctor");

      setDoctors(data);
    }
    getDoctor();
  }, []);

  console.log(doctors);

  return (
    <ul id="all-doctors">
      {doctors?.data.data.map((doctor, index) => {
        return (
          <li key={index}>
            <h1>Name: {doctor.name}</h1>
            <h2>{doctor.specialization}</h2>
            <h3>{doctor.age}</h3>
            <h3>password: {doctor.password}</h3>
            <h3>availability: {doctor.availability}</h3>
          </li>
        );
      })}
    </ul>
  );
}

export default AllDoctors;
