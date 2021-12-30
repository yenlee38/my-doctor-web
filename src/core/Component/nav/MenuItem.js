import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./nav.css";

const MenuItem = (props) => {
    const { name, subMenus, iconClassName, onClick, to, exact } = props;
    const [expand, setExpand] = useState(false);

    return (
        <li onClick={props.onClick}>
          <Link
            exact
            to={to}
            onClick={() => {
              setExpand((e) => !e);
            }}
            className={`menu-item`}
          >
            <div className="menu-icon">
              <i class={iconClassName}></i>
            </div>
            <span>{name}</span>
          </Link>
          {subMenus && subMenus.length > 0 ? (
            <ul className={`sub-menu ${expand ? "active": ""}`}>
              {subMenus.map((menu, index) => (
                <li key={index}>
                  <a href= {menu.to} className={`menu-item`}>
                  <div className="menu-icon">
              <i class={menu.iconClassName}></i>
            </div>
            <span>{menu.name}</span>
            </a>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      );
}

export default MenuItem;