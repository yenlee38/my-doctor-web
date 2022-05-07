import React from "react";
import "../styles/SenderMessageStyle.css";
import Tooltip from "@mui/material/Tooltip";
const SenderMessage = ({ message, datetime }) => {
  return (
    <div className="main-sender-container">
      <Tooltip title={datetime} placement="left">
        <div className="message-sender-container">
          <div className="message-sender">{message}</div>
        </div>
      </Tooltip>
    </div>
  );
};
export default SenderMessage;
