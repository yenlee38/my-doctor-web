import React, { useState } from "react";
import NavAdmin from "../../Component/nav/NavAdmin";
import RoomManagerHome from "./home";

const RoomManagerment = (props) => {
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
            <RoomManagerHome />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomManagerment;
