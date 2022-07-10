import React from "react";
import "../styles/SenderMessageStyle.css";
import Tooltip from "@mui/material/Tooltip";
const InfoDetail = ({ message, datetime }) => {
  return (
    <div className="main-info-receiver-container">
      <div className="info-detail-container">
        <div className="txt-info">
          <i class="bi bi-heart icon-red"></i>
          <span className="txt-info-number">Nhịp tim: {message.heartBeat}</span>
        </div>
        <div className="line-container"></div>
        <div className="txt-info">
          <span className="txt-HA"> Huyết áp: {message.title}</span>
        </div>
        <div className="line-container"></div>
        <div className="status-time-container">
          <div className="txt-info">
            <span className="txt-time">Đo ngày: {message.time}</span>
          </div>
          <div className="status-container">
            {message.status ?? "HA Binh thuong"}
          </div>
        </div>
      </div>
      <Tooltip title={datetime} placement="right">
        <div className="message-info-receiver-container">
          <div className="message-receiver">{message.message}</div>
        </div>
      </Tooltip>
    </div>
  );
};
export default React.memo(InfoDetail);
