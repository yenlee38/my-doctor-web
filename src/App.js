import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./auth/Signin";
import Error from "./core/Error";
import Home from "./core/Home/Home";

import Record from "./core/Doctor/Record";
import RecordDetail from "./core/Doctor/RecordDetail";
import InsertRecord from "./core/Doctor/InsertRecord";

import Position from "./core/Nurse/Position";
import { DEPARTMENT } from "./constant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Signin />} />
        <Route path="/error" element={<Error />} />
        <Route path="/home" element={<Home />} />

        <Route path="/record" element={<Record />} />
        <Route path="/record-detail/:id" element={<RecordDetail />} />
        <Route path="/insert-record/:patientId" element={<InsertRecord />} />

        <Route path="/position/:department" element={<Position />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
