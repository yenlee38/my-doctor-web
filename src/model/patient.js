import { API_URL, HEADER } from "../constant";

export const getPatient = async (id) => {
  try {
    const response = await fetch(API_URL + `/patient/${id}`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const BASE_URL = API_URL + "/patient";

export const getAllPatient = async () => {
  try {
   return await fetch(BASE_URL, {
      method: "GET",
      headers: HEADER
    }).then(res => res.json()).then(res => {
      return res.patient;
    })
  } catch (error) {
    console.error(error);
  }
};
