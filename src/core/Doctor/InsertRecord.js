import { useEffect, useState, useCallback } from "react";
import { isLogin } from "../../model/account";
import { getAll, getByName } from "../../model/medicine";
import { getPatient } from "../../model/patient";
import { createPrescription } from "../../model/prescription";
import { create, getAllForPatientId } from "../../model/record";
import NavDoctor from "../Component/nav/NavDoctor";
import Error from "../Error";
import Comment from "./components/comment";
import { getDoctorById } from "../../model/doctor";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import AutoCompleteTextComponent from "./components/autoChangeUseMedical";

export default function InsertRecord() {
  const [medicines, setMedicines] = useState([]);
  const [prescription, setprescription] = useState([]);
  const [patientName, setPatientName] = useState();
  const [name, setName] = useState();
  const [inactive, setInactive] = useState(false);
  const [commentByDoctor, setCommentByDoctor] = useState("");
  const [comments, setComments] = useState([]);
  const [doctor, setDoctor] = useState();
  const [isUseApp, setIsUseApp] = useState(false);

  const getCommentForPatient = (patientId) => {
    setComments([]);
    if (patientId) {
      getAllForPatientId(patientId).then((res) => {
        setComments(res);
      });
    }
  };

  const dataUseMedical = [
    { label: "Uống thuốc sau ăn" },
    { label: "Uống thuốc trước ăn" },
    { label: "Uống thuốc đúng buổi - sáng - trưa - tối" },
    { label: "Uống sau ăn, chỉ uống vào buổi tối" },
    { label: "Uống trước ăn, chỉ uống vào buổi tối " },
    { label: "Uống sau ăn, chỉ uống vào buổi sáng" },
    { label: "Uống trước ăn, chỉ uống vào buổi sáng " },
  ];

  // const getIndexMedicalSelect = (value) => {
  //   let indexUse = { label: "Uống thuốc sau ăn" };
  //   dataUseMedical.forEach((item, index) => {
  //     if (item.label === value) {
  //       indexUse = item;
  //     }
  //   });
  //   return indexUse;
  // };

  const getDoctorByIdForRecord = (doctorId) => {
    getDoctorById(doctorId).then((res) => setDoctor(res));
  };

  useEffect(() => {
    setIsUseApp(false);
    getDoctorByIdForRecord(sessionStorage.getItem("id"));
    getAll()
      .then((result) => setMedicines(result.medicine))
      .catch((err) => console.error(err));
    getPatient(window.location.pathname.split("/")[2])
      .then((result) => {
        setPatientName("");
        if (result?.patient) {
          getCommentForPatient(result.patient.id);
          setPatientName(result.patient.fullName);

          setIsUseApp(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const onChange = (event) => {
    switch (event.target.name) {
      case "patientName":
        setPatientName(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "commentByDoctor":
        setCommentByDoctor(event.target.value);
        break;
      default:
        break;
    }
  };

  // const onChangeTextComment = (event) => {
  //   setCommentByDoctor(event.target.value);
  // };

  // const onChangeMedicalUser = (event, index) => {
  //   let array = [...prescription];
  //   array[index - 1].use = dataUseMedical[event.target.value].label;
  //   setprescription(array);
  //   console.log(dataUseMedical[event.target.value].label);
  // };

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
              <div className="header-insert-record">
                <div className="div-input">
                  <div className="title">Tên bệnh nhân</div>
                  <input
                    name="patientName"
                    type="text"
                    placeholder="Nhập tên bệnh nhân"
                    value={patientName}
                    onChange={onChange}
                    className="txt-info-record"
                  />
                </div>
                <div className="div-input">
                  <div className="title"> Tên bệnh</div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nhập tên bệnh"
                    value={name}
                    onChange={onChange}
                    className="txt-info-record"
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
              >
                <div>
                  <input
                    // className="txt-info-record"
                    style={{ fontSize: 18, width: "99%" }}
                    type="search"
                    onChange={(event) => {
                      getByName(event.target.value)
                        .then((result) => setMedicines(result.medicine))
                        .catch((err) => console.error(err));
                    }}
                    placeholder="Nhập tên thuốc"
                  />
                  <div style={{ width: 200, height: 400, overflow: "scroll" }}>
                    {medicines.map((medicine) => (
                      <button
                        className="btn-medical-add"
                        onClick={() =>
                          setprescription([
                            ...prescription,
                            {
                              name: medicine.name,
                              amount: 1,
                              use: "",
                            },
                          ])
                        }
                      >
                        {medicine.name}
                      </button>
                    ))}
                  </div>
                </div>
                <table>
                  <tr className="col-name">
                    <th>STT</th>
                    <th>Tên thuốc</th>
                    <th>Liều lượng</th>
                    <th>Cách dùng</th>
                  </tr>
                  {prescription.map((medicine, index) => (
                    <tr className="data">
                      <th>{++index}</th>
                      <th>{medicine.name}</th>
                      <th>
                        <input
                          type="number"
                          value={medicine.amount}
                          style={{ width: 50, textAlign: "left" }}
                          onChange={(event) => {
                            let array = [...prescription];
                            array[index - 1].amount = event.target.value;
                            setprescription(array);
                          }}
                        />
                      </th>
                      <th>
                        <Autocomplete
                          inlist={dataUseMedical}
                          onChange={(event) => {
                            let array = [...prescription];
                            array[index - 1].use = event.target.innerText;
                            setprescription(array);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={dataUseMedical}
                          sx={{ width: 400 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={dataUseMedical[0].label}
                            />
                          )}
                        />
                        {/* <input
                          value={medicine.use}
                          style={{ width: 400 }}
                          onChange={(event) => {
                            let array = [...prescription];
                            array[index - 1].use = event.target.value;
                            setprescription(array);
                          }}
                        /> */}
                      </th>
                    </tr>
                  ))}
                </table>
              </div>
              <div style={{ borderRadius: 15, flexDirection: "column" }}>
                <div style={{ flexDirection: "row" }}>
                  <img
                    src="../../assets/imgs/report.png"
                    style={{ height: 50 }}
                  />
                  <span
                    style={{
                      color: "#238D8B",
                      fontSize: 17,
                      fontWeight: "500",
                      marginLeft: 10,
                    }}
                  >
                    Đánh giá cho lần khám này nha!
                  </span>
                </div>
                <textarea
                  name="commentByDoctor"
                  onChange={onChange}
                  style={{
                    borderColor: "#9708E4",
                    backgroundColor: "#FFF5FA",
                    borderRadius: 5,
                    fontSize: 18,
                    width: 600,
                    padding: 10,
                    maxLines: 3,
                  }}
                  value={commentByDoctor}
                />
              </div>
              <div className="div-btn-end">
                <div
                  className="btn-style"
                  onClick={() =>
                    create(
                      window.location.pathname.split("/")[2],
                      patientName,
                      name,
                      commentByDoctor
                    )
                      .then((result) => {
                        prescription.forEach((element) => {
                          createPrescription(
                            result.medicalRecord.id,
                            element.amount,
                            element.name,
                            element.use
                          )
                            .then(
                              (result) =>
                                (window.location.href =
                                  "/record-detail/" +
                                  result.prescription.recordId)
                            )
                            .catch((err) => console.error(err));
                        });
                      })
                      .catch((err) => console.error(err))
                  }
                >
                  Lưu
                </div>
              </div>
              {/* </div> */}

              <div style={{ borderRadius: 15, flexDirection: "column" }}>
                <div
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#EEEEEE",
                    marginTop: 10,
                  }}
                >
                  <img
                    src="../../assets/imgs/report_again.png"
                    style={{ height: 50 }}
                  />
                  <span
                    style={{
                      color: "#238D8B",
                      fontSize: 17,
                      fontWeight: "500",
                      marginLeft: 10,
                    }}
                  >
                    Những lần đánh giá trước!
                  </span>
                </div>
                <div>
                  {!isUseApp ? (
                    <div>
                      <div className="none-is-used-app">
                        <i class="bi bi-megaphone-fill icon-notifi"></i>
                        Bệnh nhân không sử dụng ứng dụng để đăng ký số thứ tự
                        khám bệnh
                      </div>
                    </div>
                  ) : null}
                </div>
                <div>
                  {!!comments
                    ? comments.map((item) => (
                        <Comment
                          nameDoctor={doctor?.fullname}
                          avatar={doctor?.avatar}
                          nameSick={item?.name ?? "Không hiển thị tên bệnh"}
                          commment={
                            item?.commentByDoctor ??
                            "Không có nhắc nhở, đánh giá nào"
                          }
                          date={item.date}
                          onPressGotoRecordDetail={() =>
                            (window.location.href = "/record-detail/" + item.id)
                          }
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
