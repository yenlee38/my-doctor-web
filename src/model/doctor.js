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

export const getDoctorById = async (id) => {
  try {
    return await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: HEADER,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.doctor;
      });
  } catch (error) {
    return null;
  }
};

export const updateAvatarDoctor = async (doctorId, formData) => {
  return await axios
    .post(BASE_URL + "/image/" + doctorId, formData)
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

export const updateProfile = async (
  id,
  fullname,
  department,
  phone,
  education
) => {
  return await fetch(BASE_URL + "/profile/update", {
    method: "PUT",
    headers: HEADER,
    body: JSON.stringify({
      id: id,
      fullname: fullname,
      department: department,
      phone: phone,
      education: education,
    }),
  })
    .then((response) => response.json())
    .then((result) => result.count)
    .catch((err) => console.log(err));
};
