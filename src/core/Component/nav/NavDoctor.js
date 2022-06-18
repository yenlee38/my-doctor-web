import React, { useState, useEffect } from "react";
import "./nav.css";
import MenuItem from "./MenuItem";
import { getId, isLogin, username } from "../../../model/account";
import { getDoctorById } from "../../../model/doctor";
export const menuItems = [
  {
    name: "Trang chủ",
    exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Hồ sơ bệnh án",
    exact: true,
    to: `/record`,
    iconClassName: "bi bi-file-earmark-person",
  },
  {
    name: "Bệnh nhân",
    exact: true,
    to: `/doctor/patient`,
    iconClassName: "bi bi-headset",
  },
  {
    name: "Tư vấn với bệnh nhân",
    exact: true,
    to: `/doctor/patient/message`,
    iconClassName: "bi bi-chat-quote",
  },
  {
    name: "Lịch khám bệnh",
    exact: true,
    to: `/doctor/schedule-doctor`,
    iconClassName: "bi bi-calendar3-week",
  },
];

const NavDoctor = (props) => {
  const [inactive, setInactive] = useState(false);
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = () => {
    let id = getId;
    getDoctorById(id).then((res) => setDoctor(res));
  };

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src="../../../../assets/imgs/logo.png" alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i className="bi bi-arrow-right-square-fill box"></i>
          ) : (
            <i className="bi bi-arrow-left-square-fill box"></i>
          )}
        </div>
      </div>
      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img
            src={`${doctor?.avatar ?? "../../../../assets/imgs/logo.png"}`}
            alt="user"
          />
        </div>
        <div className="user-info">
          <h5>{username}</h5>
          <p>{isLogin}</p>
        </div>
        <a
          href="/login"
          style={{ cursor: "pointer", color: "#212121", fontWeight: "bold" }}
        >
          <i className="bi bi-box-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default NavDoctor;
