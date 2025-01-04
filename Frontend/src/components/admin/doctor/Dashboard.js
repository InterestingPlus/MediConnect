const { useEffect, useState } = require("react");
const { useNavigate, Link } = require("react-router-dom");

function PatientDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/doctor-dashboard/dashboard");
      } else {
        navigate("/login");
      }
    }
    checkLocalUser();
  }, []);

  return (
    <>
      <h1> Doctor Dashboard </h1>

      <section>
        <h2>Recent Patients</h2>
        <hr />

        <ul>
          <li>Patient 1</li>
          <li>Patient 2</li>
          <li>Patient 3</li>
        </ul>
      </section>
    </>
  );
}

export default PatientDashboard;