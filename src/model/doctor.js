import { API_URL, HEADER } from "../constant";

const BASE_URL = API_URL + "/doctor";

export const getAllDoctor = async () => {
  try {
   return await fetch(BASE_URL, {
      method: "GET",
      headers: HEADER
    }).then(res => res.json()).then(res => {
      return res.doctor;
    })
  } catch (error) {
    console.error(error);
  }
};
