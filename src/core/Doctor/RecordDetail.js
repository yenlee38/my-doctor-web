import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { isLogin } from "../../model/account";
import { getAll } from "../../model/prescription";
import { getRecord } from "../../model/record";
import Error from "../Error";

export default function RecordDetail() {
  const [record, setRecord] = useState();
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    const recordId = window.location.pathname.split("/")[2];
    getRecord(recordId)
      .then((result) => {
        result.record
          ? setRecord(result.record)
          : (window.location.href = "/error");
      })
      .catch((err) => console.error(err));

    getAll(recordId)
      .then((result) => setPrescription(result.prescription))
      .catch((err) => console.error(err));
  }, []);

  if (isLogin !== "doctor") return <Error />;
  else
    return (
      <div className="home">
        <div className="menu">
          <a href="/home">Trang chủ</a>
          <a style={{ color: "#282c34", background: "#61dafb" }} href="#">
            Hồ sơ bệnh án
          </a>
          <a href="/">Đăng xuất</a>
        </div>

        <div className="main" id="print">
          <div className="title">Bệnh án</div>
          <div>Người bệnh: {record ? record.patientName : ""}</div>
          <div>Tên bệnh: {record ? record.name : ""}</div>
          <div>
            Ngày khám:{" "}
            {record ? new Date(record.date).toLocaleDateString() : ""}
          </div>
          <div className="list">
            <table>
              <tr className="label">
                <th>STT</th>
                <th>Tên thuốc</th>
                <th>Liều lượng</th>
                <th>Cách dùng</th>
              </tr>
              {prescription.map((medicine, index) => (
                <tr className="data">
                  <th>{++index}</th>
                  <th>{medicine.name}</th>
                  <th>{medicine.amount}</th>
                  <th>{medicine.use}</th>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <ReactToPrint
          trigger={() => (
            <a className="buttonlink" href="#">
              In
            </a>
          )}
          content={() => document.getElementById("print")}
        />
      </div>
    );
}
