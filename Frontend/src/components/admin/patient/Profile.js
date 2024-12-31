import axios from "axios";
import apiPath from "../../../isProduction";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientProfile() {
  const navigate = useNavigate();
  const [localUser, setUser] = useState();
  const [patient, setPatient] = useState(null);

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/patient-dashboard/profile");
      setUser(user);

      const { id, username } = await user;

      const data = await axios.post(`${await apiPath()}/auth-patient`, {
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
  useEffect(() => {
    checkLocalUser();
  }, []);

  return (
    <>
      {patient ? (
        <section id="profile">
          <img
            className="white"
            src={
              patient?.profileImg
                ? patient.profileImg
                : patient?.gender == "female"
                ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                : "https://cdn-icons-png.flaticon.com/512/4874/4874944.png"
            }
            alt="profile-pic"
          />

          <h1>
            Hello, <span> {patient?.name}. </span>
          </h1>
          <h2>
            Id : <span> {patient?._id} </span>
          </h2>
          <h2>
            Username : <span> {patient?.username} </span>
          </h2>
          <h2>
            Contact : <span> {patient?.contact} </span>
          </h2>

          <br />
          <button id="edit">Edit</button>
          <br />
          <br />
          <button
            onClick={() => {
              localStorage.clear();
              checkLocalUser();
            }}
            className="logout"
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </section>
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1>Fetching Your Details...</h1>
          <button
            onClick={() => {
              localStorage.clear();
              checkLocalUser();
            }}
            className="logout"
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      )}
    </>
  );
}

export default PatientProfile;
