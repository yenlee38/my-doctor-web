import { API_URL, HEADER } from "../constant";

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
        //const expirationDate = new Date(new Date().getTime() + 1000000);
        localStorage.setItem("remember", remember);
        //sessionStorage.setItem("token", json.token);
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
