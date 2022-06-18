import { API_URL, HEADER } from "../constant";

export const getAllRoomActive = async () => {
  try {
    const response = await fetch(API_URL + `/roomActive`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

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

export const addRoom = async (name, department) => {
  return await fetch(API_URL + `/room`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({ department: department, name: name }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const editRoom = async (id, name, department) => {
  return await fetch(API_URL + `/room/${id}`, {
    method: "PUT",
    headers: HEADER,
    body: JSON.stringify({ department: department, name: name }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const disableRoom = async (id) => {
  return await fetch(API_URL + `/room/${id}/disable`, {
    method: "PUT",
    headers: HEADER,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
