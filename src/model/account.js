import { API_URL, HEADER } from "../constant";

const BASE_URL = API_URL + "/accounts";
export const signin = async (username, password, remember) => {
  return await fetch(API_URL + "/accounts/signin", {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.count > 0 && json.account.role !== "patient") {
        console.log("role: " + json.account.role);
        //const expirationDate = new Date(new Date().getTime() + 1000000);
        localStorage.setItem("remember", remember);
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("id", json.account.id);
        //sessionStorage.setItem("expirationDate", expirationDate);
        sessionStorage.setItem("role", json.account.role);
        localStorage.setItem("username", remember ? username : "");
        localStorage.setItem("password", remember ? password : "");
        return true;
      } else return false;
    })
    .catch((err) => console.error(err));
};

export const isLogin = sessionStorage.getItem("id")
  ? sessionStorage.getItem("role")
  : "guest";

  export const username = localStorage.getItem("username");

export const getAllAccount = async() =>{
  const token =  sessionStorage.getItem("token");
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  try {
    return await fetch(BASE_URL, {
       method: "GET",
       headers: header
     }).then(res => res.json()).then(res => {
       return res.account;
     })
   } catch (error) {
     console.error(error);
   }
}