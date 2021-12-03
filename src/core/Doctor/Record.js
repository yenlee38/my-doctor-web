import { useEffect, useState } from "react";
import {
  AiFillStepBackward,
  AiFillBackward,
  AiFillForward,
  AiFillStepForward,
  AiOutlineClose,
} from "react-icons/ai";

import { isLogin } from "../../model/account";
import { getAllByRoom, used } from "../../model/position";
import { findByPatientName, getAll } from "../../model/record";
import { getAllRoom } from "../../model/room";
import Error from "../Error";

export default function Record() {
  const [positions, setPositions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const amount = 10;

  const paging = () => {
    let table = [];
    const last = amount * page;
    let i = last - amount;
    while (i < data.length && i < last) {
      const record = data[i];
      table.push(
        <tr className="data">
          <th>{++i}</th>
          <th style={{ textAlign: "left" }}>{record.patientName}</th>
          <th style={{ textAlign: "left" }}>{record.name}</th>
          <th style={{ textAlign: "right" }}>
            {new Date(record.date).toLocaleDateString()}
          </th>
          <th>
            <a
              style={{ textDecoration: "none" }}
              href={"/record-detail/" + record.id}
            >
              Xem
            </a>
          </th>
        </tr>
      );
    }
    return table;
  };

  useEffect(() => {
    getAll()
      .then((result) => setData(result.record))
      .catch((err) => console.error(err));
    getAllRoom()
      .then((result) => setRooms(result.room))
      .catch((err) => console.error(err));
  }, []);

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
              Tìm kiếm
              <input
                type="search"
                onChange={(event) => {
                  if (event.target.value === "")
                    getAll()
                      .then((result) => {
                        setData(result.record);
                        setPage(1);
                      })
                      .catch((err) => console.error(err));
                  else
                    findByPatientName(search)
                      .then((result) => {
                        setData(result);
                        setPage(1);
                      })
                      .catch((err) => console.error(err));
                }}
                placeholder="Nhập tên bệnh nhân"
              />
            </div>
            <button onClick={() => setShow(true)}>Thêm</button>
          </div>

          <dialog
            style={{
              borderRadius: 10,
              padding: "0 10px 10px 10px",
              width: 170,
            }}
            open={show}
          >
            <div style={{ direction: "rtl", color: "red" }}>
              <AiOutlineClose onClick={() => setShow(false)} />
            </div>
            <div style={{ paddingRight: 10 }}>
              <select
                onChange={(event) =>
                  getAllByRoom(event.target.value)
                    .then((result) => setPositions(result.position))
                    .catch((err) => console.error(err))
                }
              >
                {rooms.map((room) => (
                  <option value={room.name}>{room.name}</option>
                ))}
              </select>
              <br />
              {positions.map((position) => (
                <button
                  className="btn"
                  onClick={() => {
                    used(position.id)
                      .then(
                        (result) => (window.location.href = "/insert-record")
                      )
                      .catch((err) => console.error(err));
                  }}
                >
                  {position.number}
                </button>
              ))}
              {positions.length === 0 && <div>Trống</div>}
            </div>
          </dialog>

          <div className="title">Danh sách bệnh án </div>

          <div className="list">
            <table>
              <tr className="label">
                <th>STT</th>
                <th>Người bệnh</th>
                <th>Tên bệnh</th>
                <th>Ngày khám</th>
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
              text="number"
              value={page}
              onChange={(event) =>
                setPage(event.target.value > 0 ? event.target.value : 1)
              }
            />
            <AiFillForward onClick={() => setPage(page + 1)} />
            <AiFillStepForward
              onClick={() => setPage(parseInt(data.length / amount) + 1)}
            />
          </div>
          <div>Tổng: {data.length}</div>
        </div>
      </div>
    );
}