import React from "react";
import "../styles/SenderMessageStyle.css";
import Tooltip from "@mui/material/Tooltip";
const ReceiverMessage = ({ message, datetime }) => {
  return (
    <div className="main-receiver-container">
      <Tooltip title={datetime} placement="right">
        <div className="message-receiver-container">
          <div className="message-receiver">{message}</div>
        </div>
      </Tooltip>
    </div>
  );
};
export default ReceiverMessage;
