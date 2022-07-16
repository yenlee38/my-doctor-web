import React, { useCallback, useEffect, useState } from "react";
import ReactSearchBox from "react-search-box";
import { getAllDoctor } from "../../../../model/doctor";
import { Grid } from "@mui/material";
import "../styles.css";
import { getDayInMonth } from "../../../../utils/formats";
import DaySchedule from "./day-schedule";
import {
  createScheduleAPI,
  getAllScheduleByDoctorId,
} from "../../../../model/schedule";
import { getAllRoom } from "../../../../model/room";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ScheduleDetail from "./schedule-detail";
import { ToastContainer, toast } from "react-toastify";

const CalendarManagerHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorsForSearch, setDoctorsForSearch] = useState([]);
  const [doctorDetail, setDoctorDetail] = useState();
  const [schedules, setSchedules] = useState([]);
  const [numberDay, setNumberDay] = useState(0);
  const [scheduleDoctors, setScheduleDoctors] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomSelect, setRoomSelect] = useState("");
  const [scheduleSelected, setScheduleSelected] = useState();
  const [sessionCreate, setSessionCreate] = useState("AM");
  const [daySelected, setDaySelected] = useState("1");

  const clearSchedule = () => {
    setDaySelected("1");
    setScheduleSelected(null);
  };

  const notify = (message) => toast(message);

  const checkIsExitSchedule = () => {
    let isExist = false;
    schedules.forEach((item) => {
      if (item.day === daySelected) {
        if (item.session === sessionCreate) {
          isExist = true;
          if (item.roomId === roomSelect) {
            isExist = true;
          }
        }
      }
    });
    return isExist;
  };

  const createSchedule = () => {
    if (!checkIsExitSchedule()) {
      createScheduleAPI(
        doctorDetail.id,
        roomSelect,
        sessionCreate,
        daySelected
      ).then((res) => {
        if (res) {
          notify("Tạo lịch thành công!");
          getSchedules(doctorDetail.id);
        } else {
          console.log("Lỗi tạo lịch!");
        }
      });
    } else {
      notify("Lịch khám đã tồn tại");
    }
  };
  const getValueScheduleSelected = (value) => {
    setDaySelected(value.day);
    setScheduleSelected(value);
  };

  const handleChangeSession = (event) => {
    setSessionCreate(event.target.value);
  };

  const getListScheduleForDoctorDetail = (lSchedule) => {
    let numberOfMonth = 30;
    let list = [];
    for (let i = 0; i < numberOfMonth; i++) {
      list.push({ day: i + 1 });
    }

    for (let i = 0; i < numberOfMonth; i++) {
      for (let j = 0; j < lSchedule.length; j++) {
        if (lSchedule[j].day === i + 1) {
          list[i].schedule = lSchedule[j];
        }
      }
    }

    setScheduleDoctors(list);
  };

  const listDefaultSession = ["AM", "PM"];

  const getNameRoom = (roomId, rooms) => {
    let roomDetail = rooms.filter((r) => r.id === roomId)[0];
    return roomDetail.name;
  };

  useEffect(() => {
    getAllRoom().then((res) => {
      setRoom(res.room);
    });
  }, []);

  const getSchedules = useCallback(
    (id) => {
      const doctorId = id;
      if (doctorId) {
        let numberOfMonth = 30;
        let list = [];
        for (let i = 0; i < numberOfMonth; i++) {
          list.push({ day: i + 1 });
        }
        setScheduleDoctors(list);
        getAllRoom().then((rooms) => {
          console.log({ rooms });
          setRoom(rooms.room);
          setRoomSelect(rooms.room[0]);
          getAllScheduleByDoctorId(doctorId).then((res) => {
            if (res) {
              setSchedules(res);
              getScheduleDoctor(res, rooms.room);
            }
          });
        });
      }
    },
    [scheduleDoctors]
  );

  // const getNumberDayOfMonth = () => {
  //   let date = new Date();
  //   setNumberDay(getDayInMonth(date.getFullYear(), date.getMonth));
  //   return getDayInMonth(date.getFullYear(), date.getMonth);
  // };

  const isSameDay = (schedule1, schedule2) => {
    if (
      schedule1.day === schedule2.day &&
      schedule1.session !== schedule2.session
    ) {
      return true;
    } else return false;
  };

  const getScheduleSession = (schedule1, schedule2, rooms) => {
    let roomId = [schedule1.roomId, schedule2.roomId];
    let session = [schedule1.session, schedule2.session];
    let sessions = [
      {
        room: getNameRoom(schedule1.roomId, rooms),
        session: schedule1.session,
      },
      {
        room: getNameRoom(schedule2.roomId, rooms),
        session: schedule2.session,
      },
    ];
    let schedule = { ...schedule1, session, roomId, sessions };
    return schedule;
  };

  const convertToScheduleDoctor = (schedule1, rooms) => {
    let roomId = [schedule1.roomId];
    let session = [schedule1.session];
    let sessions = [
      {
        room: getNameRoom(schedule1.roomId, rooms),
        session: schedule1.session,
      },
    ];
    let schedule = { ...schedule1, session, roomId, sessions };
    return schedule;
  };

  const isExistInArray = (object, list) => {
    let flag = 0;
    list.forEach((element) => {
      if (element.day === object.day) flag = 1;
    });
    return flag;
  };

  const getScheduleDoctor = (list, rooms) => {
    let lSchedule = [];
    for (let i = 0; i < list?.length - 1; i++) {
      let flag = 0;
      for (let j = 1; j < list?.length; j++) {
        if (isSameDay(list[i], list[j])) {
          let temp = getScheduleSession(list[i], list[j], rooms);
          if (!isExistInArray(temp, lSchedule)) {
            lSchedule.push(temp);
            flag = 1;
          }
        }
      }
      if (flag === 0 && !isExistInArray(list[i], lSchedule)) {
        lSchedule.push(convertToScheduleDoctor(list[i], rooms));
      }
    }

    if (!isExistInArray(list[list.length - 1], lSchedule)) {
      lSchedule.push(convertToScheduleDoctor(list[list.length - 1], rooms));
    }

    getListScheduleForDoctorDetail(lSchedule);
  };

  const getDoctor = () => {
    getAllDoctor().then((res) => {
      setDoctors(res);
      getDoctorsForSearch(res);
    });
  };

  const convertTofromSearch = (key, value) => {
    return {
      key,
      value,
    };
  };

  const getDoctorById = (id) => {
    clearSchedule();
    getSchedules(id);
    setDoctorDetail(doctors.filter((doctor) => doctor.id === id)[0]);
  };

  const getDoctorsForSearch = (lDoctor) => {
    let listDoctor = lDoctor?.map((doctor) =>
      convertTofromSearch(doctor.id, doctor.fullname, doctor)
    );
    setDoctorsForSearch(listDoctor);
  };

  useEffect(() => {
    getDoctor();
  }, []);

  const handleChangeRoom = (event) => {
    setRoomSelect(event.target.value);
  };

  return (
    <div className="calendar-manager-container">
      <ToastContainer />
      <div className="header-container">
        <img
          src="../../../../assets/imgs/create-calandar.png"
          alt="tạo phiên trực"
        />
        <div className="search-container">
          <ReactSearchBox
            placeholder="nhập tên bác sĩ"
            value="bác sĩ"
            autoFocus
            data={doctorsForSearch}
            onSelect={(doctor) => {
              getDoctorById(doctor.item.key);
            }}
          />
        </div>
      </div>
      <div className="body-calendar-container">
        <div className="info-container">
          <div className="info-detail">
            {doctorDetail ? (
              <>
                <div className="name-avatar-info">
                  <img
                    alt="ảnh đại diện"
                    className="avatar"
                    src="https://res.cloudinary.com/yenltn/image/upload/v1655568093/gme6rv0ktxevszropcvk.jpg"
                  />
                  <div className="name">{doctorDetail.fullname}</div>
                </div>
                <div className="name-avatar-info">
                  <div className="label-name">Số điện thoại:</div>
                  <div className="name">{doctorDetail.phone}</div>
                </div>
                <div className="name-avatar-info">
                  <div className="label-name">Chuyên khoa:</div>
                  <div className="name">{doctorDetail.department}</div>
                </div>
                <div className="name-avatar-info">
                  <div className="label-name">Chứng chỉ:</div>
                  <div className="name">{doctorDetail.education}</div>
                </div>
              </>
            ) : (
              <div className="notifcation-text">
                Chọn một bác sĩ để thực hiện chỉnh sửa lịch khám
              </div>
            )}
          </div>
          {doctorDetail ? (
            <div className="calendar-container">
              <div className="txt-header-calendar">Lịch khám bệnh</div>

              <div className="calendar-detail-container">
                <Grid container spacing={3}>
                  {scheduleDoctors?.map((schedule, index) => (
                    <Grid item>
                      <DaySchedule
                        item={schedule}
                        onPressEdit={getValueScheduleSelected}
                        day={schedule.day}
                        isSchedule={!!schedule.schedule ?? false}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="create-calendar-container">
          <div>
            <div className="txt-header-calendar">
              Thông tin lịch khám ngày {daySelected}
            </div>
            {scheduleSelected?.schedule?.sessions?.map((item) => (
              <ScheduleDetail room={item.room} session={item.session} />
            ))}
          </div>
          <div>
            <div className="txt-header-calendar">Thêm lịch khám</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 140,
                  height: 50,
                  fontSize: 15,
                  borderColor: "#10908D",
                }}
                style={{
                  borderColor: "#10908D",
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Buổi khám
                </InputLabel>
                <Select
                  style={{ fontSize: 15, borderColor: "#10908D" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={sessionCreate}
                  label="Chuyên khoa"
                  onChange={handleChangeSession}
                >
                  {listDefaultSession?.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 140,
                  height: 50,
                  fontSize: 15,
                  borderColor: "#10908D",
                }}
                style={{
                  borderColor: "#10908D",
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Phòng khám
                </InputLabel>
                <Select
                  style={{ fontSize: 15, borderColor: "#10908D" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={roomSelect}
                  label="Chuyên khoa"
                  onChange={handleChangeRoom}
                >
                  {room?.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="btn-add-schedule-container">
            <div
              style={{
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <div className="btn-style" onClick={createSchedule}>
                Thêm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalendarManagerHome);
