import React from "react";

const Comment = ({
  avatar = "../../../assets/imgs/report_again.png",
  nameDoctor,
  nameSick,
  commment,
  date,
  onPressGotoRecordDetail,
}) => {
  return (
    <div className="feedback-container">
      <div>
        <img style={{ height: 40, width: 40, borderRadius: 40 }} src={avatar} />
        <span style={{ fontSize: 15, marginLeft: 10, fontWeight: "500" }}>
          BS. {nameDoctor}
        </span>
      </div>
      <div>
        <span style={{ fontSize: 18, color: "#90C8AC", fontWeight: "500" }}>
          {nameSick}
        </span>
      </div>
      <div>
        <span style={{ fontSize: 17 }}>
          {" "}
          <i class="bi bi-quote"></i> {commment}
        </span>
      </div>
      <div
        style={{ flexDirection: "row", display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            color: "#7858A6",
            backgroundColor: "#EEEEEE",
            fontSize: 17,
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            padding: 4,
            borderRadius: 4,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <span>Khám ngày: {date}</span>
        </div>
        <div onClick={onPressGotoRecordDetail} className="btn-style">
          Xem hồ sơ
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
