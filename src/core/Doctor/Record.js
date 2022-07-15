import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { isLogin } from "../../model/account";
import { getPatient } from "../../model/patient";
import {
  exist,
  getAllByRoom,
  notification,
  used,
  getCurrent,
} from "../../model/position";
import { findByPatientName, getAll } from "../../model/record";
import { getAllRoomActive } from "../../model/room";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import { MDBCol, MDBIcon } from "mdbreact";

export default function Record() {
  const [positions, setPositions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [inactive, setInactive] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
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
    if (table.length == 0)
      return (
        <tr>
          <td colSpan={5} style={{ textAlign: "center" }}>
            Không có dữ liệu
          </td>
        </tr>
      );
    else return table;
  };

  const call = async (position) => {
    try {
      await used(position.id);
      const response = await exist(
        position.room,
        position.date,
        position.number + 5
      ).then((res) => console.log({ response }));
      if (response.count === 1) {
        const result = await getPatient(response.position.patientId);
        await notification(
          result.patient.token,
          position.room,
          position.number + 5
        );
      }
      window.location.href = "/insert-record/" + position.patientId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAll()
      .then((result) => setData(result.record))
      .catch((err) => console.error(err));
    getAllRoomActive()
      .then((result) => {
        setRooms(result.room);
        getAllByRoom(result.room[0].name)
          .then((result) => setPositions(result.position))
          .catch((err) => console.error(err));
        getCurrent(result.room[0].name)
          .then((current) => setCurrentPosition(current.current))
          .catch((err) => console.error(err));
      })
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
        <div class="dialog-background" hidden={hidden}>
          <div class="dialog-content">
            <div style={{ direction: "rtl", color: "#F44336" }}>
              <AiOutlineClose
                style={{
                  cursor: "pointer",
                  backgroundColor: "#EF9A9A",
                  borderRadius: "50%",
                  padding: 5,
                  fontSize: 25,
                }}
                onClick={() => setHidden(true)}
              />
            </div>
            <div class="grid-container">
              <div class="item1">
                <strong>Chọn số thứ tự vào khám</strong>
                <p style={{ fontSize: 13 }}>
                  ngày {new Date().toLocaleDateString()}
                </p>
              </div>
              <div class="item2"></div>
              <div class="item3">
                <strong>Phòng khám:</strong>
              </div>
              <div class="item4">
                <select
                  onChange={(event) => {
                    getAllByRoom(event.target.value)
                      .then((result) => setPositions(result.position))
                      .catch((err) => console.error(err));
                    getCurrent(event.target.value)
                      .then((current) => setCurrentPosition(current.current))
                      .catch((err) => console.error(err));
                  }}
                >
                  {rooms.map((room) => (
                    <option value={room.name}>{room.name}</option>
                  ))}
                </select>
              </div>
              <div class="item6">
                <strong>STT khám:</strong>
              </div>
              <div class="item7">
                {positions.length === 0 && (
                  <p style={{ textAlign: "center" }}>Trống</p>
                )}
                {positions.map((position, index) => (
                  <button onClick={async () => call(position)}>
                    <img src="../../assets/imgs/position.png" />
                    <br />
                    <font color="red">{position.number}</font>
                  </button>
                ))}
              </div>
              <div class="item5" style={{ padding: 10 }}>
                <strong>STT đang khám</strong>
                <div>{currentPosition}</div>
              </div>
              <div class="item8">
                <label style={{ fontSize: 14 }}>
                  <font color="red">*Lưu ý: </font>Sau khi chọn số thứ tự khám,
                  thì STT sau đó 5 số sẽ được nhận thông báo về app của bệnh
                  nhân là gần tới STT khác của mình
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={`container ${inactive ? "inactive" : ""}`}>
          <div className="home">
            <div className="main">
              <div className="header-record">
                <MDBCol md="6">
                  <form className="form-inline">
                    <MDBIcon icon="search" />

                    <input
                      className="form-control form-control-sm ml-3 w-75"
                      type="text"
                      placeholder="Nhập tên bệnh nhân"
                      aria-label="Search"
                      onChange={(event) =>
                        findByPatientName(event.target.value)
                          .then((result) => {
                            setData(result);
                            setPage(1);
                          })
                          .catch((err) => console.error(err))
                      }
                    />
                  </form>
                </MDBCol>
                <div className="btn-style" onClick={() => setHidden(false)}>
                  Thêm
                </div>
              </div>

              <div className="title">Danh sách bệnh án </div>

              <div className="list">
                <table
                  style={{
                    marginBottom: 30,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <tr className="col-name">
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
