import { useEffect, useState } from "react";
import { isLogin } from "../../model/account";
import { getAll, getByName } from "../../model/medicine";
import { getPatient } from "../../model/patient";
import { createPrescription } from "../../model/prescription";
import { create } from "../../model/record";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";

export default function InsertRecord() {
  const [medicines, setMedicines] = useState([]);
  const [prescription, setprescription] = useState([]);
  const [patientName, setPatientName] = useState();
  const [name, setName] = useState();
  const [commentByDoctor, setComment] = useState();
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    getAll()
      .then((result) => setMedicines(result.medicine))
      .catch((err) => console.error(err));

    getPatient(window.location.pathname.split("/")[2])
      .then((result) => setPatientName(result.patient.fullName))
      .catch((err) => console.error(err));
  }, []);

  const onChange = (event) => {
    switch (event.target.name) {
      case "patientName":
        setPatientName(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "commentByDoctor":
        setComment(event.target.value);
        break;
      default:
        break;
    }
  };

  if (isLogin !== "doctor") return <Error />;
  else
    return (
      <>
        <NavDoctor
          onCollapse={(inactive) => {
            setInactive(inactive);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <div className="home">
            <div className="main">
              <div className="header-insert-record">
                <div className="div-input">
                  <div className="title">Tên bệnh nhân</div>
                  <input
                    name="patientName"
                    type="text"
                    placeholder="Nhập tên bệnh nhân"
                    value={patientName}
                    onChange={onChange}
                    className="txt-info-record"
                  />
                </div>
                <div className="div-input">
                  <div className="title"> Tên bệnh</div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nhập tên bệnh"
                    value={name}
                    onChange={onChange}
                    className="txt-info-record"
                  />
                </div>
              </div>
              <div className="div-input" style={{ padding: 5 }}>
                <div className="title">Đánh giá</div>
                <input
                  name="commentByDoctor"
                  type="text"
                  placeholder="Nhập đánh giá"
                  value={name}
                  onChange={onChange}
                  className="txt-info-record"
                  style={{ flex: 1 }}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
              >
                <div>
                  <input
                    // className="txt-info-record"
                    style={{ width: "99%" }}
                    type="search"
                    onChange={(event) => {
                      getByName(event.target.value)
                        .then((result) => setMedicines(result.medicine))
                        .catch((err) => console.error(err));
                    }}
                    placeholder="Nhập tên thuốc"
                  />
                  <div
                    style={{ width: "300", height: 400, overflow: "scroll" }}
                  >
                    {medicines.map((medicine) => (
                      <button
                        className="dropdown"
                        onClick={() =>
                          setprescription([
                            ...prescription,
                            {
                              name: medicine.name,
                              amount: 1,
                              use: "",
                            },
                          ])
                        }
                      >
                        {medicine.name}
                      </button>
                    ))}
                  </div>
                </div>
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
                      <th>{medicine.name}</th>
                      <th>
                        <input
                          type="number"
                          value={medicine.amount}
                          style={{ width: 50, textAlign: "left" }}
                          onChange={(event) => {
                            let array = [...prescription];
                            array[index - 1].amount = event.target.value;
                            setprescription(array);
                          }}
                        />
                      </th>
                      <th>
                        <input
                          value={medicine.use}
                          style={{ width: 400 }}
                          onChange={(event) => {
                            let array = [...prescription];
                            array[index - 1].use = event.target.value;
                            setprescription(array);
                          }}
                        />
                      </th>
                    </tr>
                  ))}
                </table>
              </div>
              {/* <div style={{ direction: "rtl" }}> */}
              <div className="div-btn-end">
                <div
                  className="btn-style"
                  onClick={() =>
                    create(
                      window.location.pathname.split("/")[2],
                      patientName,
                      name,
                      commentByDoctor
                    )
                      .then((result) => {
                        prescription.forEach((element) => {
                          createPrescription(
                            result.medicalRecord.id,
                            element.amount,
                            element.name,
                            element.use
                          )
                            .then(
                              (result) =>
                                (window.location.href =
                                  "/record-detail/" +
                                  result.prescription.recordId)
                            )
                            .catch((err) => console.error(err));
                        });
                      })
                      .catch((err) => console.error(err))
                  }
                >
                  Lưu
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </>
    );
}
