import { useEffect, useState } from "react";
import { DEPARTMENT } from "../../constant";
import { isLogin } from "../../model/account";
import Error from "../Error";

export default function Position(props) {
  const [department, setDepartment] = useState();
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState();
  const [patient, setPatient] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);

  const Add = () => {
    setShow(true);
    Print();
  };

  const Print = () => {};

  useEffect(() => {
    let depart = "";
    for (const key in DEPARTMENT) {
      if (window.location.pathname.split("/")[2] === key) {
        depart = DEPARTMENT[key];
        setDepartment(depart);
        break;
      }
    }
    depart ? setDepartment(depart) : (window.location.href = "/error");
  });

  if (isLogin !== "nurse") return <Error />;
  else
    return (
      <div>
        <button onClick={Add}>Thêm</button>
        <dialog open={show}>
          <div>Người khám</div>
          <input
            name="patient"
            type="text"
            placeholder="Nhập tên người khám"
            value={patient}
            onChange={(event) => setPatient(event.target.value)}
          />
          <div>Phòng khám</div>
          <select>
            <option>Brine shrimp</option>
            <option>Red panda</option>
            <option>Spider monkey</option>
          </select>
          <div>STT</div>
          <input name="number" type="number" value={number} disabled={true} />
          <br />
          <button>Thêm</button>
          <button onClick={() => setShow(false)}>Thoát</button>
        </dialog>
        <table>
          <tr>
            <th>STT</th>
            <th>Phòng khám</th>
            <th>Bệnh nhân</th>
            <th>Trang thái</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <button onClick={Print}>In</button>
            </th>
          </tr>
        </table>
      </div>
    );
}
