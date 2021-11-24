import { API_URL } from "../constant";

export const chartByState = async () => {
  try {
    const response = await fetch(API_URL + `/position/chartState`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const chartByDept = async () => {
  try {
    const response = await fetch(API_URL + `/position/chartDept`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
