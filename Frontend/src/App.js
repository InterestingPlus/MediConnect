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
import DoctorNav from "./components/admin/doctor/DoctorNav";
import Laboratory from "./components/admin/doctor/Laboratory";
import PatientHistory from "./components/admin/doctor/PatientHistory";
import PatientAppointment from "./components/admin/patient/Appointment";
import Book from "./components/admin/patient/Book";
import BookTime from "./components/admin/patient/BookTime";
import PatientDashboard from "./components/admin/patient/Dashboard";
import Doctor from "./components/admin/patient/Doctor";
import PatientNav from "./components/admin/patient/PatientNav";

// https://hms-backend-tr2u.onrender.com
// http://localhost:4444

function App() {
  return (
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
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointment />} />
          <Route path="history" element={<PatientHistory />} />
          <Route path="laboratory" element={<Laboratory />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
        <Route path="/patient-dashboard" element={<PatientNav />}>
          <Route index element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointment />} />
          <Route path="appointments/book" element={<Book />} />
          <Route path="appointments/book-next/:u" element={<BookTime />} />
          <Route path="appointments/doctor/:u" element={<Doctor />} />

          <Route path="history" element={<PatientHistory />} />
          <Route path="laboratory" element={<Laboratory />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
