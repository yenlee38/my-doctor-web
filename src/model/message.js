import { API_URL, HEADER } from "../constant";
import axios from "axios";

const BASE_URL = API_URL + "/message";

export const getAllByDoctorId = async (doctorId) => {
  return await fetch(BASE_URL + "/" + doctorId, {
    method: "GET",
    headers: HEADER,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.messages;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const sendImageToCloud = async (formData) => {
  return await axios.post(API_URL + "/send/image", formData).then((res) => {
    if (res) {
      console.log(res);
      return res.data.url;
    } else {
      console.log("Error send image");
      return null;
    }
  });
};
