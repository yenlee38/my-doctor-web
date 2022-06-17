import React, { useState } from "react";
import NavAdmin from "../../Component/nav/NavAdmin";
import PatientManagerHome from "./home";
import DoctorManagerHome from "./home";

const PatientManagerment = (props) => {
  const [inactive, setInactive] = useState(false);

  return (
    <>
      <NavAdmin
        onCollapse={(inactive) => {
          console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <div className="home">
          <div className="main">
            <PatientManagerHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientManagerment;
