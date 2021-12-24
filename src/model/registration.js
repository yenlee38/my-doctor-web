import { API_URL, HEADER } from "../constant";

const BASE_URL = API_URL + "/doctor-registration";

export const getAllRegistration = async () => {
  try {
   return await fetch("https://still-wave-21655.herokuapp.com/doctor-registration", {
      method: "GET",
      headers: HEADER
    }).then(res => res.json()).then(res => {
      return res.doctorRegistration;
    })
  } catch (error) {
    console.error(error);
  }
};

export const updateRegistration = async (id, name, status) => {
  return await fetch(BASE_URL + "/update/" + id, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      name: name,
      status: status,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.doctorRegistration;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
