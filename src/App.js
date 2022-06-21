import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./auth/Signin";
import Error from "./core/Error";
import Home from "./core/Home/Home";

import "./App.css";
import DoctorManagerment from "./core/Admin/accounts";
import PatientManagerment from "./core/Admin/patient";
import RoomManagerment from "./core/Admin/room";
import AdminServiceHome from "./core/Admin/service";
import ChatScreen from "./core/Doctor/chat/ChatScreen";
import InsertRecord from "./core/Doctor/InsertRecord";
import PatientService from "./core/Doctor/PatientService";
import PatientServiceDetail from "./core/Doctor/PatientServiceDetail";
import Record from "./core/Doctor/Record";
import RecordDetail from "./core/Doctor/RecordDetail";
import ScheduleDoctorHome from "./core/Doctor/schedule";
import Position from "./core/Nurse/Position";
import CalendarManagerment from "./core/Admin/calendar/index";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" exact element={<Signin />} />
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record-detail/:id" element={<RecordDetail />} />
          <Route path="/insert-record/:patientId" element={<InsertRecord />} />
          <Route path="/position/:department" element={<Position />} />
          <Route path="/doctor/patient" element={<PatientService />} />
          <Route path="/doctor/patient/message" element={<ChatScreen />} />
          <Route
            path="/patient/:patientId"
            element={<PatientServiceDetail />}
          />
          <Route path="/admin/doctor/index" element={<DoctorManagerment />} />
          <Route path="/admin/patient/index" element={<PatientManagerment />} />
          <Route path="/admin/room/index" element={<RoomManagerment />} />
          <Route path="/account" element={<PatientServiceDetail />} />
          <Route path="/admin/service" element={<AdminServiceHome />} />
          <Route
            path="/doctor/schedule-doctor"
            element={<ScheduleDoctorHome />}
          />
          <Route path="/admin/calendar" element={<CalendarManagerment />} />
        </Routes>
      </Router>
    </div>
  );
}
