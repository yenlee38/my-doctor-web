import NavSlide, {menuItems} from './core/Component/nav/NavSlide';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";
import React, {useState} from "react";
import Signin from "./auth/Signin";
import Error from "./core/Error";
import Home from "./core/Home/Home";

import Record from "./core/Doctor/Record";
import RecordDetail from "./core/Doctor/RecordDetail";
import InsertRecord from "./core/Doctor/InsertRecord";
import Position from "./core/Nurse/Position";
import NurseHome from './core/Home/NurseHome';
import "./App.css"
import PatientService from './core/Doctor/PatientService';
import PatientServiceDetail from './core/Doctor/PatientServiceDetail';
export default function App () {
    const [inactive, setInactive] = useState(false);

    return (
        <div className="App">
           <Router>
           {/* <NavSlide
        onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        /> */}
   
  
        {/* <div className={`container ${inactive ? 'inactive': ''}`}> */}
          {/* {menuItems.map((menu, index) => ( */}
            <Routes>
              {/* <Route key={menu.name} exact={menu.exact} path={menu.to} >
              </Route> */}
              {/* {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to} element={<NurseHome/>} >
                    </Route>
                  ))
                : null} */}
                
        <Route path="/login" exact element={<Signin />} />
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<NurseHome />} /> */}

        <Route path="/record" element={<Record />} />
        <Route path="/record-detail/:id" element={<RecordDetail />} />
        <Route path="/insert-record/:patientId" element={<InsertRecord />} />
        <Route path="/position/:department" element={<Position />} />
        <Route path="/doctor/patient" element={<PatientService />} />
        <Route path="/patient/:patientId" element={<PatientServiceDetail />} />
            </Routes>
          {/* ))} */}
          {/* </div> */}
      
        </Router>
        </div>
    )
}