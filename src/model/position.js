import { API_URL, HEADER } from "../constant";

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

export const getAllByDept = async (dept) => {
  try {
    const response = await fetch(API_URL + `/position/${dept}/dept`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getAllByRoom = async (room) => {
  try {
    const response = await fetch(API_URL + `/position/${room}/room`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const create = async (number, room) => {
  return await fetch(API_URL + `/position`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      number: number,
      room: room,
      date: new Date(),
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const used = async (id) => {
  return await fetch(API_URL + `/position/${id}/used`, {
    method: "PUT",
    headers: HEADER,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
