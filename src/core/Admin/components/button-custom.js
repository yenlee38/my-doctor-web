import React from "react";
import "./styles.css";
const ButtonCustom = ({ title, onPress, classStyle = "button-container" }) => {
  return (
    <div className={classStyle} onMouseDown={onPress}>
      {title}
    </div>
  );
};
export default ButtonCustom;
