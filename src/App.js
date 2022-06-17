import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Signin from "./auth/Signin";
import Error from "./core/Error";
import Home from "./core/Home/Home";

import Record from "./core/Doctor/Record";
import RecordDetail from "./core/Doctor/RecordDetail";
import InsertRecord from "./core/Doctor/InsertRecord";
import Position from "./core/Nurse/Position";
import "./App.css";
import PatientService from "./core/Doctor/PatientService";
import PatientServiceDetail from "./core/Doctor/PatientServiceDetail";
import ChatScreen from "./core/Doctor/chat/ChatScreen";
import DoctorManagerment from "./core/Admin/accounts";
import AdminServiceHome from "./core/Admin/service";
import PatientManagerment from "./core/Admin/patient";
import RoomManagerment from "./core/Admin/room";
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
        </Routes>
      </Router>
    </div>
  );
}
