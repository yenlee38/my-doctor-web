import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import InputCustom from "./input.custom";
import "./styles.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ButtonCustom from "./button-custom";
import { DEPARTMENT } from "../../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRoom, editRoom } from "../../../model/room";
import { changeRoom } from "../../../model/position";

const ModalRoom = ({ data, show, close }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(DEPARTMENT.pediatrics);
  const [execute, setExecute] = useState(false);

  const saveRoom = () => {
    if (name) {
      setExecute(true);
      data
        ? editRoom(data.id, name, department).then(() => {
            changeRoom(data.name, name);
            close();
          })
        : addRoom(name, department).then(() => close());
      setExecute(false);
    } else toast("Chưa điền đầy đủ thông tin!");
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDepartment(data.department);
    } else {
      setName("");
    }
  }, [data]);

  return (
    <Modal
      show={show}
      backdrop="static"
      centered={true}
      keyboard={false}
      contentClassName="modal-width"
    >
      <ToastContainer />
      <Modal.Body>
        <div onClick={close} className="close-icon">
          <i style={{ height: 20, width: 20 }} class="bi bi-x-circle-fill"></i>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <InputCustom
            title={"Số phòng:"}
            placeholder={"Nhập số phòng"}
            onChangeText={(text) => setName(text)}
            width={300}
            textInput={name}
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
                onChange={(event) => setDepartment(event.target.value)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <ButtonCustom
            title={execute ? "Đang lưu" : "Lưu"}
            onPress={saveRoom}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRoom;
