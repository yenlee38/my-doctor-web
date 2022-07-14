import React from "react";
import "../styles.css";
const DaySchedule = ({ day, isSchedule = false, onPressEdit, item }) => {
  return (
    <div
      className="day-schedule-item-container"
      onClick={() => {
        onPressEdit(item);
      }}
    >
      <img
        alt="phiên trực"
        className="img-day"
        src={`../../../../../assets/imgs/calendar${day}.png`}
      />
      {isSchedule ? <div className="dot-is-schedule"></div> : null}
    </div>
  );
};

export default DaySchedule;
