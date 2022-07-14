import React from "react";
import "../styles/SenderMessageStyle.css";
import Tooltip from "@mui/material/Tooltip";
import InfoDetail from "./infoDetail";

const ReceiverMessage = ({
  message,
  datetime,
  isImage = false,
  url = null,
  item,
  isInfo = false,
}) => {
  return isInfo ? (
    <InfoDetail message={item} datetime={datetime} />
  ) : !isImage ? (
    <div className="main-receiver-container">
      <Tooltip title={datetime} placement="right">
        <div className="message-receiver-container">
          <div className="message-receiver">{message}</div>
        </div>
      </Tooltip>
    </div>
  ) : (
    <div className="main-receiver-container">
      <Tooltip title={datetime} placement="right">
        <img className="image-send" src={url} alt="gửi" />
      </Tooltip>
    </div>
  );
};
export default React.memo(ReceiverMessage);
