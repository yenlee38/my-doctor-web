import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { isLogin } from "../../model/account";
import { getRecord } from "../../model/record";
import Error from "../Error";

export default function RecordDetail() {
  const [record, setRecord] = useState();

  useEffect(() => {
    getRecord(window.location.pathname.split("/")[2])
      .then((result) => {
        result.record
          ? setRecord(result.record)
          : (window.location.href = "/error");
      })
      .catch((err) => console.error(err));
  }, []);

  // const prescription = array.map((medicine) => (
  //   <tr>
  //     <th>{medicine.name}</th>
  //     <th>{medicine.amount}</th>
  //     <th>{medicine.use}</th>
  //     <th>{medicine.price}</th>
  //   </tr>
  // ));

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
          <div>Người bệnh: {record ? record.patientName : ""}</div>
          <div>Tên bệnh: {record ? record.name : ""}</div>
          <div>
            Ngày khám:{" "}
            {record ? new Date(record.date).toLocaleDateString() : ""}
          </div>
          <div className="title">Đơn thuốc</div>
          <table>
            <tr>
              <th>Tên thuốc</th>
              <th>Liều lượng</th>
              <th>Cách dùng</th>
              <th>Đơn giá</th>
            </tr>
            {/* {prescription} */}
          </table>
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
