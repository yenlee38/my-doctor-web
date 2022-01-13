import { useEffect, useState } from "react";
import { isLogin } from "../../model/account";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import { MDBCol, MDBIcon } from "mdbreact";
import { getAllPatient } from "../../model/patient";
import { getAllAccount, getId } from "../../model/account";
import { getAllRegistrationByDoctor } from "../../model/registration";
import { formatDateTime } from "../../utils/formats";
export default function PatientService() {
  const [data, setData] = useState([]);
  const [dataStatic, setDataStatic] = useState([]);
  const [page, setPage] = useState(1);
  const [inactive, setInactive] = useState(false);
  const amount = 10;

  let lPatients = [];
  let lAccount = [];
  useEffect(() => {
    getAllPatient().then((res) => {
      lPatients = res;
      getAllAccount().then((res) => {
        lAccount = res;
        getAllRegistrationByDoctor(getId).then((res) => {
          convertListRegistration(res, lPatients, lAccount);
        });
      });
    });
  }, []);

  let datas = [];

  const convertListRegistration = async (list, patients, accounts) => {
    await list.forEach((item) => {
      if (item.status === "CONFIRMED") {
        datas.push(
          createData(
            item.id,
            item.patientId,
            getNamePatientById(patients, item.patientId),
            getPhonePatientById(accounts, item.patientId),
            item.name,
            item.updatedAt,
            item.status
          )
        );
      }
    });
    setDataStatic(datas);
    setData(datas);
  };

  const findByPatientName = async (name) => {
    return await dataStatic.filter(res => res.name.includes(name));

  };

  const getPhonePatientById = (lAccount, id) => {
    let phone = id;
    if (lAccount.length > 0) {
      lAccount.forEach((p) => {
        if (p.id === id) phone = p.username;
      });
    }
    return phone;
  };

  const getNamePatientById = (lPatients, id) => {
    let name = id;
    if (lPatients.length > 0) {
      lPatients.forEach((p) => {
        if (p.id === id) {
          name = p.fullName;
        }
      });
    }

    return name;
  };
  function createData(
    id,
    patientId,
    name,
    phone,
    nameService,
    updatedAt,
    status
  ) {
    return {
      id,
      patientId,
      name,
      phone,
      nameService,
      updatedAt,
      status,
    };
  }

  const formatDate = (date) => {
    return formatDateTime(date);
  };

  const paging = () => {
    let table = [];
    const last = amount * page;
    let i = last - amount;
    while (i < data.length && i < last) {
      const res = data[i];
      table.push(
        <tr className="data">
          <th>{++i}</th>
          <th style={{ textAlign: "left" }}>{res.name}</th>
          <th style={{ textAlign: "left" }}>{res.phone}</th>
          <th style={{ textAlign: "left" }}>{res.nameService}</th>
          <th style={{ textAlign: "left" }}>{formatDate(res.updatedAt)}</th>
          <th style={{ textAlign: "left" }}>{res.status}</th>

          <th>
            <a
              style={{ textDecoration: "none" }}
              href={"/patient/" + res.patientId}
            >
              Xem
            </a>
          </th>
        </tr>
      );
    }
    return table;
  };

  if (isLogin !== "doctor") return <Error />;
  else
    return (
      <>
        <NavDoctor
          onCollapse={(inactive) => {
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
              </div>
              <div className="title">Danh sách bệnh nhân</div>

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
                    <th>Số điện thoại</th>
                    <th>Tên dịch vụ</th>
                    <th>Ngày đăng ký</th>
                    <th>Trạng thái</th>
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
