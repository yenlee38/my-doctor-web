import { API_URL } from "../constant";

export const getPatient = async (id) => {
  try {
    const response = await fetch(API_URL + `/patient/${id}`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
