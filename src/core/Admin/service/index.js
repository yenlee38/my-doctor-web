import React, { useState } from "react";
import ServiceScreen from "./ServiceScreen";
import NavAdmin from "../../Component/nav/NavAdmin";

const AdminServiceHome = (props) => {
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
            <ServiceScreen />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminServiceHome;
