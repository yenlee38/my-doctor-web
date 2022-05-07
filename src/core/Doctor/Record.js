import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { isLogin } from "../../model/account";
import { getPatient } from "../../model/patient";
import { exist, getAllByRoom, notification, used } from "../../model/position";
import { findByPatientName, getAll } from "../../model/record";
import { getAllRoom } from "../../model/room";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import { MDBCol, MDBIcon } from "mdbreact";

export default function Record() {
  const [positions, setPositions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [inactive, setInactive] = useState(false);
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

  const call = async (position) => {
    try {
      await used(position.id);
      const response = await exist(
        position.room,
        position.date,
        position.number + 5
      );
      // const json = response.json();
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
    getAllRoom()
      .then((result) => {
        setRooms(result.room);
        getAllByRoom(result.room[0].name)
          .then((result) => setPositions(result.position))
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
                <div className="btn-style" onClick={() => setShow(true)}>
                  Thêm
                </div>
              </div>
              <dialog className="dialog-add" open={show}>
                <div style={{ direction: "rtl", color: "#F44336" }}>
                  <AiOutlineClose
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#EF9A9A",
                      borderRadius: "50%",
                      padding: 5,
                      fontSize: 25,
                    }}
                    onClick={() => setShow(false)}
                  />
                </div>
                <div
                  style={{
                    paddingRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                      className="btn-style"
                      onClick={async () => call(position)}
                    >
                      {position.number}
                    </button>
                  ))}
                  {positions.length === 0 && (
                    <div className="txt-header-table">Trống</div>
                  )}
                </div>
              </dialog>

              <div className="title">Danh sách bệnh án </div>

              <div className="list">
                <table
                  style={{
                    marginBottom: 30,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
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
