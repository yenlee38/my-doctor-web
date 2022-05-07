import React from "react";
import "./styles.css";
const ButtonCustom = ({ title, onPress }) => {
  return (
    <div className="button-container" style={{}} onMouseDown={onPress}>
      {title}
    </div>
  );
};
export default ButtonCustom;
