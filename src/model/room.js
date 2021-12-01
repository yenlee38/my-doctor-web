import { API_URL } from "../constant";

export const getAllRoom = async () => {
  try {
    const response = await fetch(API_URL + `/room`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getRoomsByDept = async (dept) => {
  try {
    const response = await fetch(API_URL + `/room/${dept}`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
