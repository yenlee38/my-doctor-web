import { useEffect, useState } from "react";
import { isLogin } from "../../model/account";
import { getAll, getByName } from "../../model/medicine";
import { getPatient } from "../../model/patient";
import { createPrescription } from "../../model/prescription";
import { create } from "../../model/record";
import Error from "../Error";

export default function InsertRecord() {
  const [medicines, setMedicines] = useState([]);
  const [prescription, setprescription] = useState([]);
  const [patientName, setPatientName] = useState();
  const [name, setName] = useState();

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
      default:
        break;
    }
  };

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
        <div className="main">
          <div className="header">
            <div>
              Tên bệnh nhân
              <input
                name="patientName"
                type="text"
                placeholder="Nhập tên bệnh nhân"
                value={patientName}
                onChange={onChange}
              />
            </div>
            <div>
              Tên bệnh
              <input
                name="name"
                type="text"
                placeholder="Nhập tên bệnh"
                value={name}
                onChange={onChange}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <input
                type="search"
                onChange={(event) => {
                  getByName(event.target.value)
                    .then((result) => setMedicines(result.medicine))
                    .catch((err) => console.error(err));
                }}
                placeholder="Nhập tên thuốc"
              />
              <div style={{ width: 300, height: 400, overflow: "scroll" }}>
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
          <div style={{ direction: "rtl" }}>
            <button
              className="btn"
              onClick={() =>
                create(
                  window.location.pathname.split("/")[2],
                  patientName,
                  name
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
                              "/record-detail/" + result.prescription.recordId)
                        )
                        .catch((err) => console.error(err));
                    });
                  })
                  .catch((err) => console.error(err))
              }
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
}
