import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";

import { DEPARTMENT, NUMBER_STATE } from "../../constant";
import { isLogin } from "../../model/account";
import { getAllByDept, create, getCurrent, filter } from "../../model/position";
import { getRoomsByDept } from "../../model/room";
import Error from "../Error";
import {
  AiFillStepBackward,
  AiFillBackward,
  AiFillForward,
  AiFillStepForward,
} from "react-icons/ai";

export default function Position(props) {
  const [hidden, setHidden] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const amount = 10;
  const [filterText, setFilter] = useState({ room: "", state: "" });

  const Add = () => {
    create(number, room)
      .then((result) => {
        if (result.position === null) {
          setNumber(number + 1);
          alert("STT đã được đặt");
        } else {
          setShow(false);
          setData([...data, result.position]);
        }
      })
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

    if (depart !== department) {
      getAllByDept(depart)
        .then((result) => setData(result.position))
        .catch((err) => console.error(err));
      getRoomsByDept(depart)
        .then((result) => {
          let rooms = result.room;
          getCurrent(rooms[0].name)
            .then((current) => setNumber(current.current + 1))
            .catch((err) => console.error(err));
          setRooms(rooms);
          setRoom(rooms[0].name);
        })
        .catch((err) => console.error(err));

      setDepartment(depart);
    }
  });

  const paging = () => {
    let table = [];
    const last = amount * page;
    let i = last - amount;
    while (i < data.length && i < last) {
      const position = data[i];
      i++;
      table.push(
        <tr className="data">
          <th>{position.number}</th>
          <th>{position.room}</th>
          <th>{position.state}</th>
          <th>
            <ReactToPrint
              trigger={() => <a href="#">In</a>}
              content={() => document.getElementById("print")}
            />
          </th>
        </tr>
      );
    }
    return table;
  };

  if (isLogin !== "nurse") return <Error />;
  else
    return (
      <div className="home">
        <div className="menu">
          <a href="/home">Trang chủ</a>
          <button className="dropdown" onClick={() => setHidden(!hidden)}>
            Khoa
          </button>
          <div className="department" hidden={hidden}>
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

        <div className="main">
          <div className="space">
            <div className="title">Khoa {department}</div>
            <button className="btn" onClick={() => setShow(true)}>
              Thêm
            </button>
          </div>
          <dialog open={show}>
            Phòng khám{" "}
            <select
              onChange={(event) => {
                let room = event.target.value;
                getCurrent(room)
                  .then((current) => setNumber(current.current + 1))
                  .catch((err) => console.error(err));
                setRoom(room);
              }}
            >
              {rooms.map((room) => (
                <option value={room.name}>{room.name}</option>
              ))}
            </select>
            <div>STT</div>
            <input
              name="number"
              type="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
            <br />
            <div className="header">
              {/* <ReactToPrint
                trigger={() => <button onClick={Add}>Thêm</button>}
                content={() => document.getElementById("print")}
              /> */}
              <button onClick={Add}>Thêm</button>
              <button onClick={() => setShow(false)}>Thoát</button>
            </div>
          </dialog>

          <div style={{ padding: 15 }}>
            Phòng khám{" "}
            <select
              onChange={(event) => {
                const text = {
                  room: event.target.value,
                  state: filterText.state,
                };
                filter(text)
                  .then((result) => setData(result.position))
                  .catch((err) => console.error(err));
                setFilter(text);
              }}
            >
              <option value="">Tất cả</option>
              {rooms.map((room) => (
                <option value={room.name}>{room.name}</option>
              ))}
            </select>
            &emsp;Trạng thái{" "}
            <select
              onChange={(event) => {
                const text = {
                  state: event.target.value,
                  room: filterText.room,
                };
                filter(text)
                  .then((result) => setData(result.position))
                  .catch((err) => console.error(err));
                setFilter(text);
              }}
            >
              <option value="">Tất cả</option>
              <option value={NUMBER_STATE.USED}>{NUMBER_STATE.USED}</option>
              <option value={NUMBER_STATE.NOT_USE}>
                {NUMBER_STATE.NOT_USE}
              </option>
              <option value={NUMBER_STATE.CANCEL}>{NUMBER_STATE.CANCEL}</option>
            </select>
          </div>

          <div className="list">
            <table>
              <tr className="label">
                <th>STT</th>
                <th>Phòng khám</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
              {paging()}
            </table>
          </div>

          <div className="page">
            <AiFillStepBackward onClick={() => setPage(1)} />
            <AiFillBackward
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            />
            <input
              value={page}
              onChange={(event) =>
                setPage(event.target.value > 0 ? event.target.value : 1)
              }
            />
            <AiFillForward
              onClick={() => {
                if (page < data.length / amount) setPage(page + 1);
              }}
            />
            <AiFillStepForward
              onClick={() => setPage(parseInt(data.length / amount) + 1)}
            />
          </div>
          <div>Tổng: {data.length}</div>
        </div>
      </div>
    );
}
