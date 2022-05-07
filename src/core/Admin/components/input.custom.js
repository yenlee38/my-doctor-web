import React, { useState } from "react";
import "./styles.css";
const InputCustom = ({
  title,
  textInput,
  onChangeText,
  placeholder,
  width,
}) => {
  return (
    <div>
      <div style={{ fontSize: 20, color: "black", fontWeight: 500 }}>
        {title}
      </div>
      <input
        style={{
          width: width,
          borderRadius: 8,
          borderWidth: 4,
          borderColor: "#10908D",
          padding: "10px 20px",
          outline: "none",
        }}
        placeholder={placeholder}
        value={textInput}
        onChange={(event) => onChangeText(event.target.value)}
      />
    </div>
  );
};
export default InputCustom;
