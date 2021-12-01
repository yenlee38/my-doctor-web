import { API_URL, HEADER } from "../constant";

export const getAll = async () => {
  try {
    const response = await fetch(
      API_URL + `/medical-record/${sessionStorage.getItem("id")}/doctor`
    );
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const findByPatientName = async (patientName) => {
  return await fetch(API_URL + `/medical-record/patientName`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      doctorId: sessionStorage.getItem("id"),
      patientName: patientName,
    }),
  })
    .then((response) => response.json())
    .then((json) => json.record)
    .catch((error) => console.error(error));
};

export const getRecord = async (id) => {
  try {
    const response = await fetch(API_URL + `/medical-record/${id}/record`);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const chartByDay = async () => {
  try {
    const response = await fetch(
      API_URL + "/medical-record/" + sessionStorage.getItem("id") + "/chartDay"
    );
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getAmountByDate = async (date) => {
  return await fetch(API_URL + `/medical-record/date`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      doctorId: sessionStorage.getItem("id"),
      date: new Date(date).toISOString().split("T")[0],
    }),
  })
    .then((response) => response.json())
    .then((json) => json.chart)
    .catch((error) => console.error(error));
};

export const create = async (patientId, patientName, name, precription) => {
  return await fetch(API_URL + `/medical-record`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      doctorId: sessionStorage.getItem("id"),
      patientId: patientId,
      patientName: patientName,
      name: name,
      precription: precription,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
