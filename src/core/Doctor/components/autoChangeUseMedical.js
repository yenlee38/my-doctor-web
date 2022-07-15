import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoCompleteTextComponent = ({
  dataUseMedical,
  value = { label: "Uống sau ăn nha" },
  onChange,
  index,
}) => {
  const [text, setText] = useState(dataUseMedical[0]);

  const getIndexMedicalSelect = (value) => {
    let indexUse = { label: "Uống thuốc sau ăn" };
    dataUseMedical.forEach((item, index) => {
      if (item.label === value) {
        indexUse = item;
      }
    });
    return indexUse;
  };

  const dataForUseMedical = [
    { label: "Uống thuốc sau ăn" },
    { label: "Uống thuốc trước ăn" },
    { label: "Uống thuốc đúng buổi - sáng - trưa - tối" },
    { label: "Uống sau ăn, chỉ uống vào buổi tối" },
    { label: "Uống trước ăn, chỉ uống vào buổi tối " },
    { label: "Uống sau ăn, chỉ uống vào buổi sáng" },
    { label: "Uống trước ăn, chỉ uống vào buổi sáng " },
  ];

  return (
    <Autocomplete
      onChange={(event) => {
        onChange(event, index);
        // setText(dataUseMedical[event.target.value]);
      }}
      //   value={text}
      disablePortal
      id="combo-box-demo"
      options={dataForUseMedical}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Uống sau ăn" />}
    />
  );
};

export default AutoCompleteTextComponent;
