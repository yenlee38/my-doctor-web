import React, { useState, useEffect } from "react";
import "./nav.css";
import {DEPARTMENT} from "../../../constant";
import MenuItem from "./MenuItem";
import {isLogin, username} from "../../../model/account";
export const menuItems = [
  {
    name: "Trang chủ",
    exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Khoa",
    exact: true,
    to: `#`,
    iconClassName: "bi bi-building",
    subMenus: [
      { name: DEPARTMENT.cardiology, to: "/position/cardiology", iconClassName: "bi bi-heart" },
      { name: DEPARTMENT.dental, to: "/position/dental", iconClassName: "bi bi-emoji-laughing" },
      { name: DEPARTMENT.dermatology, to: "/position/dermatology", iconClassName: "bi bi-layers-half" },
      { name: DEPARTMENT.gastroenterology, to: "/position/gastroenterology", iconClassName: "bi bi-layout-wtf" },
      { name: DEPARTMENT.laboratory, to: "/position/laboratory", iconClassName: "bi bi-modem" },
      { name: DEPARTMENT.musculoskeletal, to: "/position/musculoskeletal", iconClassName: "bi bi-bezier2" },
      { name: DEPARTMENT.nephrology, to: "/position/nephrology", iconClassName: "bi bi-octagon" },
      { name: DEPARTMENT.neurology, to: "/position/neurology", iconClassName: "bi bi-outlet" },
      { name: DEPARTMENT.obstetric, to: "/position/obstetric", iconClassName: "bi bi-diagram-2" },
      { name: DEPARTMENT.ophthalmology, to: "/position/ophthalmology", iconClassName: "bi bi-eye" },
      { name: DEPARTMENT.otorhinolaryngology, to: "/position/otorhinolaryngology", iconClassName: "bi bi-gear-wide-connected" },
      { name: DEPARTMENT.pediatrics, to: "/position/pediatrics", iconClassName: "bi bi-people" },
      { name: DEPARTMENT.respiratory, to: "/position/respiratory", iconClassName: "bi bi-shield-exclamation" }

      
    ],
  }
];

const NavSlide = (props) => {
  const [inactive, setInactive] = useState(false);
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

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
          <i class="bi bi-arrow-right-square-fill box"></i>
        ) : (
          <i class="bi bi-arrow-left-square-fill box"></i>
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
        <img src="../../../../assets/imgs/logo.png" alt="user" />
      </div>
      <div className="user-info">
      <h5>{username}</h5>
        <p>{isLogin}</p>
      </div>
      <a href="/login" style={{cursor:'pointer', color: '#212121', fontWeight: 'bold'}}><i class="bi bi-box-arrow-right"></i></a>
    </div>
  </div>
  );
};

export default NavSlide;
