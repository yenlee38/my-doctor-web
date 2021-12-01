import { useState } from "react";
import { isLogin } from "../../model/account";
import Error from "../Error";

export default function InsertRecord() {
  const [hidden, setHidden] = useState(true);
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState();
  const [patientName, setPatientName] = useState();
  const [name, setName] = useState();
  let prescription = [];

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
          <div>
            Tên bệnh nhân
            <input
              name="patientName"
              type="text"
              placeholder="Nhập tên bệnh nhân"
              value={patientName}
              onChange={onChange}
            />
            <br />
            Tên bệnh
            <input
              name="name"
              type="text"
              placeholder="Nhập tên bệnh"
              value={name}
              onChange={onChange}
            />
            <br />
            Thuốc
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                event.target.value !== "" ? setHidden(false) : setHidden(true);
                //setMedicines();
              }}
              placeholder="Nhập tên thuốc"
            />
            <br />
            <select
              hidden={hidden}
              value={medicine}
              onChange={(event) => {
                setMedicine(event.target.value);
                prescription.push(medicine);
                setHidden(true);
                setSearch("");
              }}
            >
              {medicines.map((medicine) => (
                <option value={medicine}>medicine.name</option>
              ))}
            </select>
          </div>
          <table>
            <tr>
              <th>Tên thuốc</th>
              <th>Liều lượng</th>
              <th>Cách dùng</th>
            </tr>
            {prescription.map((medicine) => (
              <tr>
                <th>{medicine.name}</th>
                <th>{medicine.name}</th>
                <th>{medicine.name}</th>
              </tr>
            ))}
          </table>
          <div style={{ direction: "rtl" }}>
            <button className="btn">Lưu</button>
          </div>
        </div>
      </div>
    );
}
