import { API_URL, HEADER } from "../constant";
import axios from "axios";
const BASE_URL = API_URL + "/doctor";

export const getAllDoctor = async () => {
  try {
    return await fetch(BASE_URL, {
      method: "GET",
      headers: HEADER,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.doctor;
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateAvatarDoctor = async (formData) => {
  return await axios
    .post(
      BASE_URL + "/upload/" + "099f459d-561c-400c-8f99-271e9465efe4",
      formData
    )
    .then((res) => {
      if (res.data.count > 0) {
        console.log(res.data.doctor);
        return res.data.doctor;
      } else {
        console.log("Error Found");
        return null;
      }
    });
};
