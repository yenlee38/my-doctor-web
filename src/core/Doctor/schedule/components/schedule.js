import React, { useEffect, useState } from "react";
import { getId } from "../../../../model/account";
import { getAllScheduleByDoctorId } from "../../../../model/schedule";
import "../styles.css";
import DaySchedule from "./day-schedule";
import { Grid } from "@mui/material";
import { formatDate, getDayInMonth } from "../../../../utils/formats";
const ScheduleDoctor = () => {
  const [schedules, setSchedules] = useState([]);
  const [numberDay, setNumberDay] = useState(0);
  const [scheduleDoctors, setScheduleDoctors] = useState([]);

  useEffect(() => {
    getSchedules();
    getNumberDayOfMonth();
  }, []);

  const getSchedules = () => {
    const doctorId = getId;
    if (doctorId) {
      getAllScheduleByDoctorId(doctorId).then((res) => {
        setSchedules(res);
      });
    }
  };

  const getNumberDayOfMonth = () => {
    let date = new Date();
    setNumberDay(getDayInMonth(date.getFullYear(), date.getMonth));
  };

  const scheduleDoctorItem = (day, schedule) => {
    return {
      day,
      schedule,
    };
  };

  const getScheduleDoctor = () => {};

  const dateNow = formatDate(Date());
  return (
    <div className="main-screen">
      {!schedules ? (
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
            <div className="btn-date-now date-now-schedule">{dateNow}</div>
          </div>
          <div className="schedule-container">
            <Grid container spacing={3}>
              {schedules?.map((schedule, index) => (
                <Grid item>
                  {" "}
                  <DaySchedule
                    dayNumber={index + 1}
                    isScheduled={true}
                    sessions={[{ hi: "a" }, { hi: "b" }]}
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
