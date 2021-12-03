import { API_URL } from "../constant";

export const getAll = async () => {
  try {
    const response = await fetch(API_URL + `/medicine`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getByName = async (name) => {
  try {
    const response = await fetch(API_URL + `/medicine/${name}`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
