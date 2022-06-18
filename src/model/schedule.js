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
