import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllDoctors from "./components/AllDoctors";
import CreateDoctor from "./components/CreateDoctor";
import CreatePatient from "./components/CreatePatient";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
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
          <Route path="doctor/:u" element={<Doctor />} />

          {/* Patient */}
          {/* <Route path="all-doctors" element={<AllDoctors />} /> */}
          <Route path="create-patient" element={<CreatePatient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
