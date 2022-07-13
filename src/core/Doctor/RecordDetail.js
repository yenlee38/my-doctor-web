import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { isLogin } from "../../model/account";
import { getAll } from "../../model/prescription";
import { getRecord } from "../../model/record";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";

export default function RecordDetail() {
  const [record, setRecord] = useState();
  const [prescription, setPrescription] = useState([]);
  const [inactive, setInactive] = useState(false);

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
      <>
        <NavDoctor
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <div className="home">
            <div className="main" id="print">
              <div className="div-print">
                <ReactToPrint
                  trigger={() => (
                    <a className="btn-print" href="#">
                      In
                    </a>
                  )}
                  content={() => document.getElementById("print")}
                />
              </div>
              <div className="title">Bệnh án</div>
              <div className="txt-header-table">
                Người bệnh: {record ? record.patientName : ""}
              </div>
              <div className="txt-header-table">
                Tên bệnh: {record ? record.name : ""}
              </div>
              <div className="txt-header-table">
                Ngày khám:{" "}
                {record ? new Date(record.date).toLocaleDateString() : ""}
              </div>
              <div className="list">
                <table>
                  <tr className="col-name">
                    <th>STT</th>
                    <th>Tên thuốc</th>
                    <th>Liều lượng</th>
                    <th>Cách dùng</th>
                  </tr>
                  {prescription.map((medicine, index) => (
                    <tr className="data">
                      <th>{++index}</th>
                      <th style={{ textAlign: "left" }}>{medicine.name}</th>
                      <th>{medicine.amount}</th>
                      <th style={{ textAlign: "left" }}>{medicine.use}</th>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
