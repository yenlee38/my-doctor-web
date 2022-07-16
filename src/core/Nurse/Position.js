import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { DEPARTMENT, NUMBER_STATE } from "../../constant";
import { isLogin } from "../../model/account";
import { getAllByDept, create, getCurrent, filter } from "../../model/position";
import { getRoomsByDept } from "../../model/room";
import Error from "../Error";
import "../../App.css";
import NavSlide from "../Component/nav/NavSlide";

export default function Position(props) {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState();
  const [room, setRoom] = useState();
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const amount = 10;
  const [filterText, setFilter] = useState({ room: "", state: "" });
  const [inactive, setInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const add = () => {
    create(number, room)
      .then((result) => {
        if (result.position === null) {
          setNumber(number + 1);
          setError("Trùng số thứ tự");
        } else {
          setShow(false);
          getAllByDept(department)
            .then((result) => setData(result.position))
            .catch((err) => console.error(err));
          setFilter({ room: "", state: "" });
          setError("");
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
        .then((result) => {
          setData(result.position);
          setIsLoading(false);
        })
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
  }, []);

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
              trigger={() => (
                <a href="#" className="btn-print">
                  In
                </a>
              )}
              content={() => document.getElementById("print")}
            />
            <div style={{ display: "none" }}>
              <div id="print" style={{ textAlign: "center" }}>
                <h6>Khoa {department}</h6>
                <p>
                  Phòng: {position.room} - STT: {position.number}
                </p>
              </div>
            </div>
          </th>
        </tr>
      );
    }
    return table;
  };

  if (isLogin !== "nurse") return <Error />;
  else
    return (
      <>
        <NavSlide
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <div className="home">
            <div className="main">
              <div className="space">
                <div className="title">Khoa {department}</div>
                <button className="btn-style" onClick={() => setShow(true)}>
                  Thêm
                </button>
              </div>
              <dialog className="dialog-add" open={show}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div className="txt-header-table"> Phòng khám</div>
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
                </div>
                <div className="div-input">
                  <div className="txt-header-table">STT</div>
                  <input
                    className="txt-info-stt"
                    name="number"
                    type="number"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                  />
                </div>
                <div
                  style={{
                    direction: "rtl",
                    color: "red",
                    fontSize: 13,
                    marginBottom: 10,
                  }}
                >
                  {error}
                </div>
                <div className="header">
                  <div className="btn-style" onClick={add}>
                    Thêm
                  </div>
                  <div
                    className="btn-style-cancel"
                    onClick={() => setShow(false)}
                  >
                    Thoát
                  </div>
                </div>
              </dialog>

              <div style={{ padding: 15 }}>
                <span className="txt-header-table">Phòng khám</span>
                <select
                  value={filterText.room}
                  onChange={(event) => {
                    const text = {
                      room: event.target.value,
                      state: filterText.state,
                    };
                    filter(text, department)
                      .then((result) => setData(result.position))
                      .catch((err) => console.error(err));
                    setFilter(text);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả</option>
                  {rooms.map((room) => (
                    <option value={room.name}>{room.name}</option>
                  ))}
                </select>
                &emsp;
                <span className="txt-header-table"> Trạng thái </span>
                <select
                  value={filterText.state}
                  onChange={(event) => {
                    const text = {
                      state: event.target.value,
                      room: filterText.room,
                    };
                    filter(text, department)
                      .then((result) => setData(result.position))
                      .catch((err) => console.error(err));
                    setFilter(text);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value={NUMBER_STATE.USED}>{NUMBER_STATE.USED}</option>
                  <option value={NUMBER_STATE.NOT_USE}>
                    {NUMBER_STATE.NOT_USE}
                  </option>
                  <option value={NUMBER_STATE.CANCEL}>
                    {NUMBER_STATE.CANCEL}
                  </option>
                </select>
              </div>

              <div className="list">
                <table>
                  <tr className="col-name">
                    <th>STT</th>
                    <th>Phòng khám</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                  {paging()}
                </table>
                {!isLoading && data.length === 0 ? (
                  <div className="div-loading">
                    <span className="txt-nodata">Không có dữ liệu về STT</span>
                  </div>
                ) : null}
                {isLoading ? (
                  <div className="div-loading">
                    <img
                      alt="Loading"
                      className="img-loading"
                      src="../../../assets/imgs/loadComponent.gif"
                    />
                  </div>
                ) : null}
              </div>

              <div className="page">
                <div className="txt-header-table">Tổng: {data.length}</div>
                <div className="paging">
                  <div className="paging-icon" onClick={() => setPage(1)}>
                    <i class="bi bi-chevron-left"></i>
                  </div>
                  <div
                    className="paging-icon"
                    onClick={() => {
                      if (page > 1) setPage(page - 1);
                    }}
                  >
                    <i class="bi bi-chevron-double-left"></i>
                  </div>
                  <input
                    className="txt-paging"
                    value={page}
                    onChange={(event) =>
                      setPage(event.target.value > 0 ? event.target.value : 1)
                    }
                  />
                  <div
                    className="paging-icon"
                    onClick={() => {
                      if (page < data.length / amount) setPage(page + 1);
                    }}
                  >
                    <i class="bi bi-chevron-double-right"></i>
                  </div>

                  <div
                    className="paging-icon"
                    onClick={() => setPage(parseInt(data.length / amount) + 1)}
                  >
                    <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
