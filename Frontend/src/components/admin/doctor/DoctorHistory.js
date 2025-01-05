import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiPath from "../../../isProduction";
import "../patient/Book.scss";

function DoctorHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState();

  useEffect(() => {
    async function findHistory() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        const { id, username } = await user;

        const data = await axios.post(`${await apiPath()}/auth-doctor`, {
          id,
          username,
        });

        if (data.data.status) {
          try {
            const history_data = await axios.post(
              `${await apiPath()}/doctor-history`,
              {
                id,
              }
            );

            if (history_data.data.success) {
              setHistory(history_data.data.data);
            } else {
              alert("Internal Server Error!");
            }
          } catch (err) {
            alert("Can't find Your History!");
          }
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } else {
        navigate("/");
      }
    }
    findHistory();
  }, []);

  return (
    <>
      <h1>Recent Patient</h1>

      {history ? (
        history.length > 0 ? (
          <>
            <ul id="all-doctors">
              {history.map((doctor, index) => {
                return (
                  <Link to={`/doctor-dashboard/patient/${doctor.username}`}>
                    <li key={index}>
                      <img
                        src={
                          doctor?.profileImg
                            ? doctor.profileImg
                            : doctor?.gender == "female"
                            ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                            : "https://cdn-icons-png.flaticon.com/512/4874/4874944.png"
                        }
                        alt="profile-pic"
                      />
                      <span>
                        <h1> {doctor?.name}</h1>
                        <h2>{doctor?.address?.state}</h2>
                        <h2>{doctor?.address?.city}</h2>
                      </span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </>
        ) : (
          <div id="not-found">
            <dotlottie-player
              src="https://lottie.host/a7a63795-79b1-422b-81fc-797d952a8682/BEHP79u2q9.lottie"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h3>No History Available</h3>
          </div>
        )
      ) : (
        <div id="small-loading">
          <span className="animation"></span>
          <h1>Loading History...</h1>
        </div>
      )}
    </>
  );
}

export default DoctorHistory;
