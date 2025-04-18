import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateDoctor from "./components/CreateDoctor";
import CreatePatient from "./components/CreatePatient";
import Home from "./components/Home";
import Login from "./components/Login";
import LoginDoctor from "./components/LoginDoctor";
import LoginPatient from "./components/LoginPatient";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

import DoctorAppointment from "./components/admin/doctor/Appointment";
import DoctorDashboard from "./components/admin/doctor/Dashboard";
import DoctorHistory from "./components/admin/doctor/DoctorHistory";
import DoctorNav from "./components/admin/doctor/DoctorNav";
import DoctorNotification from "./components/admin/doctor/DoctorNotification";
import LaboratoryDoctor from "./components/admin/doctor/Laboratory";
import DoctorProfile from "./components/admin/doctor/Profile";
import Doctor from "./components/admin/patient/Doctor";

import { useEffect, useState } from "react";
import PatientAppointment from "./components/admin/patient/Appointment";
import Book from "./components/admin/patient/Book";
import BookTime from "./components/admin/patient/BookTime";
import PatientDashboard from "./components/admin/patient/Dashboard";
import LaboratoryPatient from "./components/admin/patient/Laboratory";
import PatientHistory from "./components/admin/patient/PatientHistory";
import PatientNav from "./components/admin/patient/PatientNav";
import PatientNotification from "./components/admin/patient/PatientNotification";
import PatientProfile from "./components/admin/patient/Profile";

// import Logo from "./images/White.png";
import NotFound from "./components/NotFound";
import Hospital from "./components/admin/hospital/Hospital";
import AllHospitals from "./components/admin/hospital/Hospitals";
import LoadingAnimation from "./images/Loader.gif";

// https://hms-backend-tr2u.onrender.com
// http://localhost:4444

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div id="custom-loader">
          {/* <img src={Logo} alt="MediConnect Logo" /> */}
          <img src={LoadingAnimation} />
          <h1>
            Medi<span>Connect</span>
          </h1>
        </div>
      ) : (
        <></>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />

            {/* Doctors */}
            <Route path="create-doctor" element={<CreateDoctor />} />
            <Route path="login-doctor" element={<LoginDoctor />} />

            {/* Patient */}
            {/* <Route path="all-patient" element={<AllDoctors />} /> */}
            <Route path="create-patient" element={<CreatePatient />} />
            <Route path="login-patient" element={<LoginPatient />} />
          </Route>

          <Route path="/doctor-dashboard" element={<DoctorNav />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointment />} />

            <Route path="history" element={<DoctorHistory />} />
            <Route path="laboratory" element={<LaboratoryDoctor />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="notification" element={<DoctorNotification />} />
          </Route>

          <Route path="/patient-dashboard" element={<PatientNav />}>
            <Route path="appointments" element={<PatientAppointment />} />
            <Route path="appointments/book" element={<Book />} />
            <Route path="appointments/book-next/:u" element={<BookTime />} />
            <Route path="appointments/doctor/:u" element={<Doctor />} />

            <Route path="all-hospitals" element={<AllHospitals />} />
            <Route path="hospital/:u" element={<Hospital />} />

            <Route path="history" element={<PatientHistory />} />
            <Route path="laboratory" element={<LaboratoryPatient />} />
            <Route path="profile" element={<PatientProfile />} />

            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="notification" element={<PatientNotification />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
