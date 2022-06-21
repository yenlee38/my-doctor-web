import React from "react";
import Session from "./session";
import "../styles.css";
const DaySchedule = ({ isScheduled = false, dayNumber, sessions = [] }) => {
  return (
    <div
      className={`day-schedule-container ${
        isScheduled ? " is-schedule" : " is-not-schedule"
      } `}
    >
      <div className="day-number">{dayNumber}</div>
      {isScheduled ? (
        <div className="body-day-schedule">
          {sessions?.map((item) => {
            return <Session room={item.room} session={item.session} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(DaySchedule);
