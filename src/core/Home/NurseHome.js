import { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { DEPARTMENT, NUMBER_STATE } from "../../constant";
import { chartByState, chartByDept } from "../../model/position";

export default function NurseHome() {
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);

  const groupBy = (objectArray, property) => {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = {};
      }
      acc[key][obj.state] = obj.amount;
      return acc;
    }, {});
  };

  const table = () => {
    let content = [];
    for (const key in data) {
      content.push(
        <tr className="data">
          <th>{key}</th>
          <th>{data[key][NUMBER_STATE.NOT_USE] || 0}</th>
          <th>{data[key][NUMBER_STATE.USED] || 0}</th>
          <th>{data[key][NUMBER_STATE.CANCEL] || 0}</th>
          <th>{data[key][NUMBER_STATE.EXPIRED] || 0}</th>
        </tr>
      );
    }
    return content;
  };

  useEffect(() => {
    chartByState()
      .then((result) => setData(groupBy(result.chart, "department")))
      .catch((err) => console.error(err));

    chartByDept()
      .then((result) => {
        let sum = 0;
        const chart = result.chart;
        chart.forEach((element) => {
          sum += element.amount;
        });
        let percent = [];
        chart.forEach((element) => {
          percent.push({
            y: Math.round((element.amount * 10000) / sum) / 100,
            label: element.department,
          });
        });
        setChart(percent);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div className="home">
      <div className="menu">
        <a href="#" style={{ color: "#282c34", background: "#61dafb" }}>
          Trang chủ
        </a>
        <button className="dropdown" onClick={() => setHidden(!hidden)}>
          Khoa
        </button>
        <div className="department" hidden={hidden}>
          <a href="/position/pediatrics">{DEPARTMENT.pediatrics}</a>
          <a href="/position/dental">{DEPARTMENT.dental}</a>
          <a href="/position/dermatology">{DEPARTMENT.dermatology}</a>
          <a href="/position/gastroenterology">{DEPARTMENT.gastroenterology}</a>
          <a href="/position/laboratory">{DEPARTMENT.laboratory}</a>
          <a href="/position/musculoskeletal">{DEPARTMENT.musculoskeletal}</a>
          <a href="/position/nephrology">{DEPARTMENT.nephrology}</a>
          <a href="/position/neurology">{DEPARTMENT.neurology}</a>
          <a href="/position/obstetric">{DEPARTMENT.obstetric}</a>
          <a href="/position/ophthalmology">{DEPARTMENT.ophthalmology}</a>
          <a href="/position/otorhinolaryngology">
            {DEPARTMENT.otorhinolaryngology}
          </a>
          <a href="/position/pediatrics">{DEPARTMENT.pediatrics}</a>
          <a href="/position/respiratory">{DEPARTMENT.respiratory}</a>
        </div>
        <a href="/">Đăng xuất</a>
      </div>

      <div style={{ display: "flex", flexDirection: "row", minWidth: "80%" }}>
        <CanvasJSChart
          options={{
            title: { text: "Biểu đồ đặt lịch khám bệnh theo khoa" },
            data: [
              {
                type: "pie",
                legendText: "{label}",
                indexLabel: "{label}: {y}%",
                dataPoints: chart,
              },
            ],
          }}
        />

        <table>
          <tr className="label">
            <th>Khoa</th>
            <th>Chưa khám</th>
            <th>Đã khám</th>
            <th>Hủy</th>
            <th>Quá hạn</th>
          </tr>
          {table()}
        </table>
      </div>
    </div>
  );
}
