import React, { useState } from "react";
import NavAdmin from "../../Component/nav/NavAdmin";
import DoctorManagerHome from "./home";

const DoctorManagerment = (props) => {
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
            <DoctorManagerHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorManagerment;
