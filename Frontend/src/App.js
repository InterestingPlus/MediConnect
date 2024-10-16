import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllDoctors from "./components/AllDoctors";
import CreateDoctor from "./components/CreateDoctor";
import CreatePatient from "./components/CreatePatient";
import Home from "./components/Home";
import Login from "./components/Login";
import LoginDoctor from "./components/LoginDoctor";
import LoginPatient from "./components/LoginPatient";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Dashboard from "./components/admin/doctor/Dashboard";
import Doctor from "./components/doctor/Doctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          {/* Doctors */}
          <Route path="all-doctors" element={<AllDoctors />} />
          <Route path="create-doctor" element={<CreateDoctor />} />
          <Route path="login-doctor" element={<LoginDoctor />} />
          <Route path="doctor/:u" element={<Doctor />} />

          {/* Patient */}
          {/* <Route path="all-patient" element={<AllDoctors />} /> */}
          <Route path="create-patient" element={<CreatePatient />} />
          <Route path="login-patient" element={<LoginPatient />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
