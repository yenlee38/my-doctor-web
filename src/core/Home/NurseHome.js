import { useEffect, useState } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { NUMBER_STATE } from "../../constant";
import { chartByState, chartByDept } from "../../model/position";
import NavSlide from "../Component/nav/NavSlide";

export default function NurseHome() {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);
  const [inactive, setInactive] = useState(false);

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
  }, []);

  return (
    <>
      <NavSlide
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <div className="home-nurse">
          <div className="main-nurse">
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

            <div className="list">
              <table>
                <tr className="col-name">
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
        </div>
      </div>
    </>
  );
}
