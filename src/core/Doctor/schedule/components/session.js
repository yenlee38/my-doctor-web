import React from "react";
import "../styles.css";
const Session = ({ room, session }) => {
  return (
    <div className="session-container">
      <div className="session-room-text">{room}</div>
      <div className="session-text">{session}</div>
    </div>
  );
};

export default React.memo(Session);
