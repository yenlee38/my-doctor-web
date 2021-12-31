import { API_URL, HEADER } from "../constant";

const BASE_URL = API_URL + "/message";

export const getAllByDoctorId = async (doctorId) => {
    return await fetch(BASE_URL + "/" + doctorId,  {
        method: "GET",
        headers: HEADER,
      })
        .then((res) => res.json())
        .then((res) => {
          return res.messages;
        }).catch((error) => {
            console.log( error);
            return null;
          });
    };
    
