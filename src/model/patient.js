import { API_URL, HEADER } from "../constant";
import axios from "axios";
const BASE_URL = API_URL + "/patient/";

export const getPatient = async (id) => {
  try {
    const response = await fetch(BASE_URL + id);
    const json = response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPatient = async () => {
  try {
    return await fetch(BASE_URL, {
      method: "GET",
      headers: HEADER,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.patient;
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateAvatar = async (formData, patientId) => {
  return await axios
    .post(BASE_URL + patientId, formData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  // let headers = {
  //   Accept: "application/json",
  //   "Content-Type": "multipart/form-data",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   "Access-Control-Allow-Origin": "*",
  //   crossDomain: "true",
  // };
  // try {
  //   const response = await fetch(BASE_URL + patientId, {
  //     method: "POST",
  //     body: formData,
  //     headers: headers,
  //   });
  //   const res = await response.json();
  //   return res;
  // } catch (error) {
  //   return console.log("uploadImage error:", error);
  // }
};

export const updateProfile = async (
  id,
  fullName,
  birthDate,
  gender,
  address,
  avatar
) => {
  return await fetch(BASE_URL + id, {
    method: "PUT",
    headers: HEADER,
    body: JSON.stringify({
      fullName: fullName,
      birthDate: birthDate,
      gender: gender,
      address: address,
      avatar: avatar,
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result.message))
    .catch((err) => console.log(err));
};
