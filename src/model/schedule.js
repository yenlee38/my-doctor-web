import { API_URL, HEADER } from "../constant";

const BASE_URL = API_URL + "/schedule";

export const getAllScheduleByDoctorId = async (doctorId) => {
  return await fetch(BASE_URL + "/" + doctorId + "/doctor", {
    method: "GET",
    headers: HEADER,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.schedule;
    })
    .catch((error) => {
      return [];
    });
};

export const createScheduleAPI = async (doctorId, roomId, session, day) => {
  return await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({ doctorId, roomId, session, day }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("ressssss", res);
      if (res.count === 1) {
        return true;
      } else return false;
    })
    .catch((err) => {
      return false;
    });
};
