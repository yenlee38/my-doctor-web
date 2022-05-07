import React, { useEffect, useState } from "react";
import "../styles/SenderMessageStyle.css";
const SearchComponent = ({ name, onChangeText }) => {
  const [text, setText] = useState(name);

  return (
    <div className="search-container">
      <i class="bi bi-search"></i>
      <input value={""} placeholder={"Tìm kiếm bệnh nhân...."}></input>
    </div>
  );
};

export default SearchComponent;
