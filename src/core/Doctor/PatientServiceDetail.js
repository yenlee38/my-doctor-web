import { useEffect, useState } from "react";
import { isLogin, getId, getAccount } from "../../model/account";
import { getAllByDoctorId } from "../../model/message";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import { formatDateTime } from "../../utils/formats";
import { getPatient } from "../../model/patient";
export default function PatientServiceDetail() {
  const [messages, setMessages] = useState([]);
  const [patient, setPatient] = useState();
  const [account, setAccount] = useState();
  const [inactive, setInactive] = useState(false);
  const [page, setPage] = useState(1);
  const amount = 10;

  useEffect(() => {
    let list = [];
    const patientId = window.location.pathname.split("/")[2];
    getPatient(patientId).then((res) => setPatient(res.patient));
    getAccount(patientId).then((res) => setAccount(res));
    getAllByDoctorId(getId)
      .then((res) => {
        res.forEach((m) => {
          if (m.senderId === patientId) list.push(m);
        });
        setMessages(list);
      })
      .catch((err) => console.error(err));
  }, []);

  const paging = () => {
    let table = [];
    const last = amount * page;
    let i = last - amount;
    while (i < messages.length && i < last) {
      const res = messages[i];
      table.push(
        <tr className="data">
          <th>{++i}</th>
          <th style={{ textAlign: "left" }}>{res.content}</th>
          <th style={{ textAlign: "left" }}>{formatDate(res.updatedAt)}</th>
        </tr>
      );
    }
    return table;
  };

  const formatDate = (date) => {
    return formatDateTime(date);
  };

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
            <div className="main" id="print">
              <div className="title">Thông tin bệnh nhân</div>
              <div className="txt-header-table">
                Người bệnh: {patient ? patient.fullName : ""}
              </div>
              <div className="txt-header-table">
                Số điện thoại: {account ? account.username : ""}
              </div>
              <div className="list">
                <table>
                  <tr className="label">
                    <th>STT</th>
                    <th>Nội dung</th>
                    <th>Ngày gửi</th>
                  </tr>
                  {paging()}
                </table>
              </div>

              <div className="page">
                <div className="txt-header-table">Tổng: {messages.length}</div>
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
                      if (page < messages.length / amount) setPage(page + 1);
                    }}
                  >
                    <i class="bi bi-chevron-double-right"></i>
                  </div>

                  <div
                    className="paging-icon"
                    onClick={() =>
                      setPage(parseInt(messages.length / amount) + 1)
                    }
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
