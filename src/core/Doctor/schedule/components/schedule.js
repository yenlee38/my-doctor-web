import React, { useEffect, useState } from "react";
import { getId } from "../../../../model/account";
import { getAllScheduleByDoctorId } from "../../../../model/schedule";
import "../styles.css";
import DaySchedule from "./day-schedule";
import { Grid } from "@mui/material";
import { formatDate, getDayInMonth } from "../../../../utils/formats";
import { getAllRoom } from "../../../../model/room";
const ScheduleDoctor = () => {
  const [schedules, setSchedules] = useState([]);
  const [numberDay, setNumberDay] = useState(0);
  const [scheduleDoctors, setScheduleDoctors] = useState([]);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    getSchedules();
    getNumberDayOfMonth();
  }, []);

  useEffect(() => {
    getAllRoom().then((res) => {
      setRoom(res.room);
    });
  }, []);

  const getListScheduleForDoctorDetail = (lSchedule) => {
    let numberOfMonth = 30;
    let list = [];
    for (let i = 0; i < numberOfMonth; i++) {
      list.push({ day: i + 1 });
    }

    for (let i = 0; i < numberOfMonth; i++) {
      for (let j = 0; j < lSchedule.length; j++) {
        if (lSchedule[j].day == i + 1) {
          list[i].schedule = lSchedule[j];
        }
      }
    }
    setScheduleDoctors(list);
  };

  const getNameRoom = (roomId, rooms) => {
    let roomDetail = rooms?.filter((r) => r.id === roomId)[0];
    return roomDetail?.name;
  };

  const getSchedules = () => {
    const doctorId = getId;
    if (doctorId) {
      getAllRoom().then((rooms) => {
        setRoom(rooms.room);
        getAllScheduleByDoctorId(doctorId).then((res) => {
          if (res) {
            setSchedules(res);
            console.log("ressss", res);
            getScheduleDoctor(res, rooms.room);
          }
        });
      });
    }
  };

  const getNumberDayOfMonth = () => {
    let date = new Date();
    setNumberDay(getDayInMonth(date.getFullYear(), date.getMonth));
    return getDayInMonth(date.getFullYear(), date.getMonth);
  };

  const isSameDay = (schedule1, schedule2) => {
    if (
      schedule1.day === schedule2.day &&
      schedule1.session != schedule2.session
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

  const dateNow = formatDate(Date());
  return (
    <div className="main-screen">
      {schedules.length == 0 ? (
        <div className="non-schedule-container">
          <img src={"../../../../assets/imgs/calandar-empty.png"} />
          <div className="non-schedule-text">
            Bạn hiện tại không có lịch khám nào!
          </div>
        </div>
      ) : (
        <>
          <div className="context-container">
            <img src="../../../../assets/imgs/calandar.png" />
          </div>
          <div className="context-container">
            <div
              className="btn-date-now date-now-schedule"
              onClick={() => {
                getScheduleDoctor(schedules);
              }}
            >
              {dateNow}
            </div>
          </div>
          <div className="schedule-container">
            <Grid container spacing={3}>
              {scheduleDoctors?.map((schedule, index) => (
                <Grid item>
                  {" "}
                  <DaySchedule
                    dayNumber={schedule.day}
                    isScheduled={!!schedule.schedule ?? false}
                    sessions={schedule.schedule?.sessions}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(ScheduleDoctor);
