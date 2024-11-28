const { useEffect, useState } = require("react");
const { useNavigate, Link } = require("react-router-dom");

function PatientDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLocalUser() {
      const user = await JSON.parse(localStorage.getItem("profile"));

      if (user) {
        navigate("/patient-dashboard/dashboard");
      } else {
        navigate("/login");
      }
    }
    checkLocalUser();
  }, []);

  return (
    <>
      <h1> Dashboard </h1>
    </>
  );
}

export default PatientDashboard;
