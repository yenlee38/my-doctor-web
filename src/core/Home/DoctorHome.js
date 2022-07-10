import { useState } from "react";
import Chart from "../Doctor/Chart";
import NavDoctor from "../Component/nav/NavDoctor";

export default function DoctorHome() {
  const [inactive, setInactive] = useState(false);

  return (
    <>
      <NavDoctor
        onCollapse={(inactive) => {
          console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <div className="home">
          <div className="main">
            <div className="title">Biểu đồ số lượng người khám bệnh</div>
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}
