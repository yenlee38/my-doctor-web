import React, { useState } from "react";
import NavAdmin from "../../Component/nav/NavAdmin";
import CalendarManager from "./components.js/calendar-manager";

const CalendarManagerment = (props) => {
  const [inactive, setInactive] = useState(false);

  return (
    <>
      <NavAdmin
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <div className="home">
          <div className="main">
            <CalendarManager />
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarManagerment;
