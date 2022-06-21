import React from "react";
import "../styles.css";
const ScheduleDetail = ({ room, session }) => {
  return (
    <div className="schedule-detail-container">{`${room}: ${session}`}</div>
  );
};

export default React.memo(ScheduleDetail);
