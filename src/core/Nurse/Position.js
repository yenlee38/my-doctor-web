import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { DEPARTMENT } from "../../constant";
import { isLogin } from "../../model/account";
import { getAllByDept, create } from "../../model/position";
import { getRoomsByDept } from "../../model/room";
import Error from "../Error";

export default function Position(props) {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);

  const Add = () => {
    setShow(false);
    create(number, room)
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let depart = "";
    for (const key in DEPARTMENT) {
      if (window.location.pathname.split("/")[2] === key) {
        depart = DEPARTMENT[key];
        break;
      }
    }
    if (depart === "") window.location.href = "/error";
    else {
      getAllByDept(depart)
        .then((result) => setData(result.position))
        .catch((err) => console.error(err));
      getRoomsByDept(depart)
        .then((result) => setRooms(result.room))
        .catch((err) => console.error(err));
    }
  });

  if (isLogin !== "nurse") return <Error />;
  else
    return (
      <div className="home">
        <div className="menu">
          <a href="#">Trang chủ</a>
          <button className="dropdown">Khoa</button>
          <div
            style={{ display: "flex", flexDirection: "column", opacity: 0.5 }}
            hidden={true}
          >
            <a href="/position/pediatrics">{DEPARTMENT.pediatrics}</a>
            <a href="/position/dental">{DEPARTMENT.dental}</a>
            <a href="/position/dermatology">{DEPARTMENT.dermatology}</a>
            <a href="/position/gastroenterology">
              {DEPARTMENT.gastroenterology}
            </a>
            <a href="/position/laboratory">{DEPARTMENT.laboratory}</a>
            <a href="/position/musculoskeletal">{DEPARTMENT.musculoskeletal}</a>
            <a href="/position/nephrology">{DEPARTMENT.nephrology}</a>
            <a href="/position/neurology">{DEPARTMENT.neurology}</a>
            <a href="/position/obstetric">{DEPARTMENT.obstetric}</a>
            <a href="/position/ophthalmology">{DEPARTMENT.ophthalmology}</a>
            <a href="/position/otorhinolaryngology">
              {DEPARTMENT.otorhinolaryngology}
            </a>
            <a href="/position/pediatrics">{DEPARTMENT.pediatrics}</a>
            <a href="/position/respiratory">{DEPARTMENT.respiratory}</a>
          </div>
          <a href="/">Đăng xuất</a>
        </div>

        <button onClick={() => setShow(true)}>Thêm</button>
        <dialog open={show}>
          <div>Phòng khám</div>
          <select
            onChange={(event) => {
              setNumber(1);
              setRoom(event.target.value);
            }}
          >
            {rooms.map((room) => (
              <option value={room.name}>{room.name}</option>
            ))}
          </select>
          <div>STT</div>
          <input name="number" type="number" value={number} disabled={true} />
          <br />
          <ReactToPrint
            trigger={() => <button onClick={Add}>Thêm</button>}
            content={() => (
              <div>
                <div>{number}</div>
                <div>Phòng khám: {room}</div>
              </div>
            )}
          />
          <button onClick={() => setShow(false)}>Thoát</button>
        </dialog>
        <table>
          <tr>
            <th>STT</th>
            <th>Phòng khám</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
          {data.map((position) => (
            <tr>
              <th>{position.number}</th>
              <th>{position.room}</th>
              <th>{position.state}</th>
              <th>
                <ReactToPrint
                  trigger={() => <a href="#">In</a>}
                  content={() => (
                    <div>
                      <div>{position.number}</div>
                      <div>Phòng khám: {position.room}</div>
                    </div>
                  )}
                />
              </th>
            </tr>
          ))}
        </table>
      </div>
    );
}
