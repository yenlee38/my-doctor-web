import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { isLogin } from "../../model/account";
import { getAll } from "../../model/prescription";
import { getRecord } from "../../model/record";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import { formatDate } from "../../utils/formats";

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
            <div className="main">
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
              <div id="print">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="../../../../assets/imgs/logo.png"
                    alt="webscript"
                    width="20%"
                    height="20%"
                  />
                  <div>
                    <h5>C?? S??? KH??M B???NH MYDOCTOR </h5>
                    <h6>
                      ?????a ch???: 499/15/10B L?? Quang ?????nh, ph?????ng 1, qu???n G?? V???p
                    </h6>
                  </div>
                </div>
                <div className="title">B???nh ??n</div>
                <div className="txt-header-table">
                  H??? v?? t??n: {record ? record.patientName : ""}
                </div>
                <div className="txt-header-table">
                  Ch???n ??o??n: {record ? record.name : ""}
                </div>
                <div className="txt-header-table">
                  Ng??y kh??m: {record ? formatDate(record.date) : ""}
                </div>
                <div
                  className="txt-header-table"
                  style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}
                >
                  Thu???c ??i???u tr???{" "}
                </div>
                <div className="list">
                  <table>
                    <tr className="col-name">
                      <th>STT</th>
                      <th>T??n thu???c</th>
                      <th>Li???u l?????ng</th>
                      <th>C??ch d??ng</th>
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
                <div className="txt-header-table">
                  L???i d???n: {record ? record.commentByDoctor : ""}
                </div>
                <div className="txt-header-table" style={{ textAlign: "end" }}>
                  <br />
                  B??c s?? kh??m b???nh <br />
                  (K?? v?? ghi r?? h??? t??n)
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
