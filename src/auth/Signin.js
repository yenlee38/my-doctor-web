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
    <div
      className="background"
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        flexDirection: "row",
        backgroundImage: "url(../../assets/bg.jpg)",
      }}
    >
      <div
        style={{
          boxShadow: "1px 1px 5px #1DB9C3",
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 10,
          },
          shadowOpacity: 0.12,
          shadowRadius: 60,
          borderWidth: 0,
          borderRadius: 20,
          borderColor: "#161E54",
          borderStyle: "dashed",
          padding: 20,
          marginRight: 100,
          justifyContent: "center",
          width: 350,
        }}
      >
        <div style = {{justifyContent:'center'}}>
          {" "}
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              fontSize: 20,
              fontWeight: "bold",
              color: "#1DB9C3",
              textAlign:'center'
            }}
          >
            MY DOCTOR
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#F56FAD" }}>
          Tên đăng nhập
        </div>
        <input
          name="username"
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={onChange}
          style={{
            borderRadius: 15,
            padding: 10,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#1DB9C3",
            fontSize: 14,
            width: "90%",
          }}
        />
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#F56FAD" }}>
          Mật khẩu
        </div>
        <input
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={onChange}
          style={{
            borderRadius: 15,
            padding: 10,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#1DB9C3",
            fontSize: 14,
            width: "90%",
          }}
        />
        <div style={{ direction: "rtl", fontSize: 15, color: "#002366" }}>
          Nhớ tài khoản
          <input
            name="remember"
            type="checkbox"
            checked={remember}
            onChange={onChange}
          />
        </div>
        <div className="error">{error}</div>
        <button
          onClick={Signin}
          style={{
            color: "white",
            fontWeight: "bold",
            borderRadius: 15,
            padding: 10,
            borderWidth: 0,
            backgroundColor: "#1DB9C3",
            width: "100%",
          }}
        >
          Đăng nhập
        </button>
      </div>
      <img
        src="../../assets/imgs/bgLogin.gif"
        style={{ width: "40%", height: "100%" }}
      />
    </div>
  );
}
