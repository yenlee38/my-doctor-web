import NavSlide, {menuItems} from '../Component/nav/NavSlide';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";
import React, {useState} from "react";
export default function HomeMain () {
    const [inactive, setInactive] = useState(false);

    return (
        <div className="App">
      <Router>
        <NavSlide
        // onCollapse={(inactive) => {
        //     console.log(inactive);
        //     setInactive(inactive);
        //   }}
        />

        <div className={`container ${inactive ? "inactive" : ""}`}>
        {/* improvememt, not recorded in video, its just looping through menuItems
        instead of hard coding all the routes */}
        {menuItems.map((menu, index) => (
          <>
            <Route key={menu.name} exact={menu.exact} path={menu.to}>
              <h1>{menu.name}</h1>
            </Route>
            {menu.subMenus && menu.subMenus.length > 0
              ? menu.subMenus.map((subMenu, i) => (
                  <Route key={subMenu.name} path={subMenu.to}>
                    <h1>{subMenu.name}</h1>
                  </Route>
                ))
              : null}
          </>
        ))}
       </div>
        </Router>
        </div>
    )
}