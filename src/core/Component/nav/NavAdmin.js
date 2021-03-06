import React, { useState, useEffect } from "react";
import "./nav.css";
import MenuItem from "./MenuItem";
import { isLogin, username } from "../../../model/account";
export const menuItems = [
  {
    name: "Thanh toán dịch vụ",
    exact: true,
    to: `/`,
    iconClassName: "bi bi-wallet2",
  },
  {
    name: "Dịch vụ",
    exact: true,
    to: `/admin/service`,
    iconClassName: "bi bi-kanban",
  },
  {
    name: "Bác sĩ",
    exact: true,
    to: `/admin/doctor/index`,
    iconClassName: "bi bi-person-workspace",
  },
  {
    name: "Lịch khám bác sĩ",
    exact: true,
    to: `/admin/calendar`,
    iconClassName: "bi bi-calendar2-plus",
  },
  {
    name: "Phòng bệnh",
    exact: true,
    to: `/admin/room/index`,
    iconClassName: "bi bi-door-open",
  },
  {
    name: "Bệnh nhân",
    exact: true,
    to: `/admin/patient/index`,
    iconClassName: "bi bi-person-plus",
  },
];

const NavDoctor = (props) => {
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
        <a
          href="/login"
          style={{ cursor: "pointer", color: "#212121", fontWeight: "bold" }}
        >
          <i class="bi bi-box-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default NavDoctor;
