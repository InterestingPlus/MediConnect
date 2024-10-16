const { useEffect, useState } = require("react");
const { useNavigate } = require("react-router-dom");

function Dashboard() {
  const navigate = useNavigate();
  const [localuser, setUser] = useState();

  async function checkLocalUser() {
    const user = await JSON.parse(localStorage.getItem("profile"));

    if (user) {
      navigate("/dashboard");
      setUser(user);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    checkLocalUser();
  }, []);

  return (
    <main id="dashboard">
      <button
        onClick={() => {
          localStorage.clear();
          checkLocalUser();
        }}
        className="logout"
      >
        Logout
      </button>

      <h1>Hello {localuser?.username}</h1>
    </main>
  );
}

export default Dashboard;
