import React, { useState, useEffect } from "react";
import "./nav.css";
import MenuItem from "./MenuItem";
export const menuItems = [
  {
    name: "Trang chủ",
    exact: true,
    to: "/admin/payment",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Thanh toán dịch vụ",
    exact: true,
    to: `/admin/payment`,
    iconClassName: "bi bi-wallet2"
  }
];

const NavDoctor = (props) => {
  const [inactive, setInactive] = useState(false);
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
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
        <h5>Rizwan Khan</h5>
        <p>rizwankhan@gmail.com</p>
      </div>
    </div>
  </div>
  );
};

export default NavDoctor;
