import { useEffect, useState } from "react";
import NavDoctor from "../Component/nav/NavDoctor";
import { getAmountByDate } from "../../model/record";
import { CanvasJSChart } from "canvasjs-react-charts";

export default function DoctorHome() {
  const [inactive, setInactive] = useState(false);
  const [chartMonth, setMonth] = useState([]);
  const [chartWeek, setWeek] = useState([]);

  useEffect(async () => {
    for (let index = 1; index <= 31; index++) {
      const result = await getAmountByDate(
        new Date(new Date().setDate(new Date().getDate() - index))
      );
      if (result.y > 0) {
        const item = { x: new Date(result.x), y: result.y };
        setMonth([...chartMonth, item]);
        if (index <= 8) setWeek([...chartWeek, item]);
      }
    }
  }, []);

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
            {chartMonth.length === 0 ? (
              <div style={{ minHeight: 100, textAlign: "center" }}>
                Không có dữ liệu
              </div>
            ) : (
              <div>
                {chartWeek.length > 0 ? (
                  <CanvasJSChart
                    options={{
                      title: { text: "Trong 7 ngày" },
                      axisX: { valueFormatString: "DD/MM" },
                      axisY: { title: "(người)" },
                      data: [{ type: "column", dataPoints: chartWeek }],
                    }}
                  />
                ) : null}
                <CanvasJSChart
                  options={{
                    title: { text: "Trong 30 ngày" },
                    // dataPointMaxWidth: 60,
                    axisX: { valueFormatString: "DD/MM" },
                    axisY: { title: "(người)" },
                    data: [{ type: "column", dataPoints: chartMonth }],
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
