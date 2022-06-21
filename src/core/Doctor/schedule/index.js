import { useState } from "react";
import NavDoctor from "../../Component/nav/NavDoctor";
import ScheduleDoctor from "./components/schedule";
const ScheduleDoctorHome = (props) => {
  const [inactive, setInactive] = useState(false);

  return (
    <>
      <NavDoctor
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <div className="home">
          <div className="main">
            <ScheduleDoctor />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleDoctorHome;
