import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InputCustom from "./input.custom";
import "./styles.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MDBCol, MDBIcon } from "mdbreact";
import InputLabel from "@mui/material/InputLabel";
import ButtonCustom from "./button-custom";
import { DEPARTMENT } from "../../../constant";
const ModalAddDoctor = function ({ isVisited, onCancel }) {
  const [show, setShow] = React.useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [department, setDepartment] = useState(DEPARTMENT.pediatrics);
  const [usename, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    setShow(isVisited);
  });

  const onClick = () => {};
  const handleClose = () => {
    setShow(false);
    onCancel();
  };

  const handleChangeDeparment = (event) => {
    setDepartment(event.target.value);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered={true}
      keyboard={false}
      contentClassName="modal-width"
    >
      <Modal.Body>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            padding: 20,
          }}
        >
          <div></div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              textAlign: "center",
              color: "#2D8D8B",
            }}
          >
            Thêm bác sĩ
          </div>

          <img src="../../../../../assets/imgs/add_doctor.png" />
        </div>
        <div>
          <InputCustom
            title={"Họ và tên:"}
            placeholder={"Nhập họ và tên"}
            onChangeText={setFullName}
            width={600}
            textInput={fullName}
          />
          <div style={{ height: 20 }}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <InputCustom
              title={"Số điện thoại:"}
              placeholder={"Nhập số điện thoại"}
              onChangeText={setPhone}
              width={180}
              textInput={phone}
            />
            <InputCustom
              title={"Chứng chỉ:"}
              placeholder={"Nhập chứng chỉ"}
              onChangeText={setEducation}
              width={180}
              textInput={education}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 140,
                  height: 50,
                  fontSize: 15,
                  borderColor: "#10908D",
                }}
                style={{
                  borderColor: "#10908D",
                }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Chuyên khoa
                </InputLabel>
                <Select
                  style={{ fontSize: 15, borderColor: "#10908D" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={department}
                  label="Chuyên khoa"
                  onChange={handleChangeDeparment}
                >
                  <MenuItem value={DEPARTMENT.pediatrics}>
                    {DEPARTMENT.pediatrics}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.otorhinolaryngology}>
                    {DEPARTMENT.otorhinolaryngology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.obstetric}>
                    {DEPARTMENT.obstetric}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.ophthalmology}>
                    {DEPARTMENT.ophthalmology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.dental}>
                    {DEPARTMENT.dental}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.cardiology}>
                    {DEPARTMENT.cardiology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.dermatology}>
                    {DEPARTMENT.dermatology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.laboratory}>
                    {DEPARTMENT.laboratory}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.gastroenterology}>
                    {DEPARTMENT.gastroenterology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.musculoskeletal}>
                    {DEPARTMENT.musculoskeletal}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.neurology}>
                    {DEPARTMENT.neurology}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.respiratory}>
                    {DEPARTMENT.respiratory}
                  </MenuItem>
                  <MenuItem value={DEPARTMENT.nephrology}>
                    {DEPARTMENT.nephrology}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{ height: 20 }}></div>
          <div style={{ fontSize: 20, color: "black", fontWeight: 500 }}>
            Tài khoản để đăng nhập
          </div>
          <div style={{ height: 20 }}></div>
          <div
            style={{
              display: "flex",

              flexDirection: "row",
            }}
          >
            <InputCustom
              title={"Username:"}
              placeholder={"Nhập username"}
              onChangeText={setPhone}
              width={180}
              textInput={phone}
            />
            <div style={{ width: 20 }}></div>
            <InputCustom
              title={"Password:"}
              placeholder={"Nhập password"}
              onChangeText={setEducation}
              width={180}
              textInput={education}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <ButtonCustom title={"Thêm bác sĩ"} onPress={onCancel} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddDoctor;
