import React, { useState, useEffect } from "react";
import { signin } from "../model/account";

export default function Signin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    sessionStorage.clear();
    if (localStorage.getItem("remember") === "true") {
      setRemember(true);
      setUsername(localStorage.getItem("username"));
      setPassword(localStorage.getItem("password"));
    }
  }, []);

  const onChange = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "remember":
        setRemember(event.target.checked);
        break;
      default:
        break;
    }
  };

  const Signin = () => {
    username || password
      ? signin(username, password, remember)
          .then((result) =>
            result
              ? (window.location.href = "/home")
              : setError("Tên đăng nhập hoặc tài khoản không đúng")
          )
          .catch((err) => console.error(err))
      : setError("Tên đăng nhập hoặc mật khẩu trống");
  };

  return (
    <div>
      <div>Tên đăng nhập</div>
      <input
        name="username"
        type="text"
        placeholder="Nhập tên đăng nhập"
        value={username}
        onChange={onChange}
      />
      <div>Mật khẩu</div>
      <input
        name="password"
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={onChange}
      />
      <br />
      <input
        name="remember"
        type="checkbox"
        checked={remember}
        onChange={onChange}
      />
      Nhớ tài khoản
      <div>{error}</div>
      <button onClick={Signin}>Đăng nhập</button>
    </div>
  );
}
