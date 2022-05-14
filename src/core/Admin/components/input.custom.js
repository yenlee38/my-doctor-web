import React, { useState } from "react";
import "./styles.css";
const InputCustom = ({
  title,
  textInput,
  onChangeText,
  placeholder,
  width,
  disabled = false,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      <div style={{ fontSize: 15, color: "black", fontWeight: 500 }}>
        {title}
      </div>
      <input
        style={{
          width: width,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "#0ED3EE",
          padding: "10px 20px",
          outline: "none",
        }}
        disabled={disabled}
        placeholder={placeholder}
        value={textInput}
        onChange={(event) => {
          onChangeText(event.target.value);
          !event.target.value
            ? setErrorMessage("Không được để trống!")
            : setErrorMessage("");
        }}
      />
      <div style={{ color: "red" }}>{errorMessage}</div>
    </div>
  );
};
export default InputCustom;
