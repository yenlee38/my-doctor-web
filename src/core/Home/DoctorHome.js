import { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { chartByDay, getAmountByDate } from "../../model/record";
import Chart from "../Doctor/Chart";

export default function DoctorHome() {
  const [chartDay, setChartDay] = useState([]);

  useEffect(() => {
    chartByDay()
      .then((result) => setChartDay(result.chart))
      .catch((err) => console.error(err));
  });

  return (
    <div className="home">
      <div className="menu">
        <a style={{ color: "#282c34", background: "#61dafb" }} href="#">
          Trang chủ
        </a>
        <a href="/record">Hồ sơ bệnh án</a>
        <a href="/">Đăng xuất</a>
      </div>

      <div className="chart">
        Biểu đồ số lượng người khám bệnh
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CanvasJSChart
            options={{
              title: { text: "Trong ngày" },
              axisX: { interval: 1 },
              axisY: { title: "(người)" },
              data: [{ type: "spline", dataPoints: chartDay }],
            }}
          />
          <Chart />
        </div>
      </div>
    </div>
  );
}
