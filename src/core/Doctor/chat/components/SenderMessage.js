import React from "react";
import "../styles/SenderMessageStyle.css";
import Tooltip from "@mui/material/Tooltip";
const SenderMessage = ({ message, datetime, isImage = false, url = null }) => {
  console.log("render", isImage);
  return !isImage ? (
    <div className="main-sender-container">
      <Tooltip title={datetime} placement="left">
        <div className="message-sender-container">
          <div className="message-sender">{message}</div>
        </div>
      </Tooltip>
    </div>
  ) : (
    <div className="main-sender-container">
      <Tooltip title={datetime} placement="left">
        <img className="image-send" src={url} />
      </Tooltip>
    </div>
  );
};
export default React.memo(SenderMessage);
