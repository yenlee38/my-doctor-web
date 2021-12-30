import { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { chartByDay } from "../../model/record";
import Chart from "../Doctor/Chart";
import NavDoctor from "../Component/nav/NavDoctor";

export default function DoctorHome() {
  const [chartDay, setChartDay] = useState([]);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    chartByDay()
      .then((result) => setChartDay(result.chart))
      .catch((err) => console.error(err));
  },[]);

  return (
    <>
    <NavDoctor onCollapse={(inactive) => {
    console.log(inactive);
    setInactive(inactive);
  }} />
    <div className={`container ${inactive ? "inactive" : ""}`}>

    <div className="home">
      <div className="main">
        <div className="title">Biểu đồ số lượng người khám bệnh</div>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <CanvasJSChart
            options={{
              title: { text: "Trong ngày" },
              axisX: { interval: 1 },
              axisY: { title: "(người)" },
              data: [{ type: "spline", dataPoints: chartDay }],
            }}
          /> */}
        <Chart />
        {/* </div> */}
      </div>
    </div>
    </div>
    </>
  );
}
