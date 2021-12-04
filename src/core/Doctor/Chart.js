import { CanvasJSChart } from "canvasjs-react-charts";
import React, { Component } from "react";
import { getAmountByDate } from "../../model/record";

var chartMonth = [];
var chartWeek = [];
export default class Chart extends Component {
  render() {
    return (
      <div>
        <CanvasJSChart
          options={{
            title: { text: "Trong 7 ngày" },
            axisX: { valueFormatString: "DD/MM" },
            axisY: { title: "(người)" },
            data: [{ type: "column", dataPoints: chartWeek }],
          }}
          onRef={(ref) => (this.week = ref)}
        />
        <CanvasJSChart
          options={{
            title: { text: "Trong 30 ngày" },
            dataPointMaxWidth: 60,
            axisX: { valueFormatString: "DD/MM" },
            axisY: { title: "(người)" },
            data: [{ type: "column", dataPoints: chartMonth }],
          }}
          onRef={(ref) => (this.month = ref)}
        />
      </div>
    );
  }

  componentDidMount() {
    for (let index = 1; index <= 31; index++) {
      getAmountByDate(
        new Date(new Date().setDate(new Date().getDate() - index))
      )
        .then((result) => {
          if (result.y > 0) {
            chartMonth.push({ x: new Date(result.x), y: result.y });
            if (index <= 8)
              chartWeek.push({ x: new Date(result.x), y: result.y });
          }
          this.week.render();
          this.month.render();
        })
        .catch((err) => console.log(err));
    }
  }
}
