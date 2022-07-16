import React, { useState } from "react";
import { shortMessage } from "../../../../utils/formats";

const PatientChatComponent = ({
  name,
  lastSend,
  avatar,
  createdAt,
  isSelected,
  setReceiverId,
  setPatientChooseSend,
  patient,
}) => {
  const [selected, setSelected] = useState(false);
  const onSeleted = () => {
    setSelected(true);
  };
  const unSeleted = () => {
    setSelected(false);
  };

  return (
    <div
      className={`main-patient-container ${
        selected ? "patient-selected" : ""
      } ${isSelected ? "patient-selected" : ""}`}
      onMouseDown={() => {
        onSeleted();
        setReceiverId();
        setPatientChooseSend(patient);
      }}
      onMouseLeave={unSeleted}
      onMouseMove={onSeleted}
    >
      <div className="avatar-container">
        <img
          className="img-patient"
          src={avatar ?? "../../../assets/imgs/logo.png"}
          alt="ảnh đại diện"
        />
      </div>
      <div className="info-container">
        <div className="name-message-component">{name}</div>
        <div className="content-date-message-component">
          <div>{lastSend ? shortMessage(lastSend) : ""}</div>
          <div>{createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PatientChatComponent);
