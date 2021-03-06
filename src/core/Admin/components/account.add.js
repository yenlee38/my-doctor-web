import React, { useState } from "react";
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
import { updateAvatarDoctor, updateProfile } from "../../../model/doctor";
import { signup } from "../../../model/account";
import { ROLES } from "../../../asset/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ModalAddDoctor = function ({ isVisited, onCancel }) {
  const [show, setShow] = React.useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [department, setDepartment] = useState(DEPARTMENT.pediatrics);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const notify = (message) => toast(message);
  const fileSelectedHandle = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateAvatarDoctor = (doctorId) => {
    setIsAdding(true);
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    updateAvatarDoctor(doctorId, fd).then((res) => {
      if (res) {
        //TODO: update info
        updateProfile(doctorId, fullName, department, phone, education).then(
          (result) => {
            setIsAdding(false);

            result
              ? notify("Th??m b??c s?? th??nh c??ng!")
              : notify("L???i kh??ng th??m ???????c b??c s??");
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        );
      }
    });
  };

  const createDoctor = (account) => {
    handleUpdateAvatarDoctor(account.id);
  };

  const handleCreateAccount = () => {
    return !(
      !fullName ||
      !phone ||
      !education ||
      !department ||
      !username ||
      !password ||
      !profileImg
    );
  };
  const createAccount = () => {
    if (handleCreateAccount()) {
      setIsAdding(true);
      signup(username, password, ROLES.DOCTOR).then((account) => {
        setIsAdding(false);
        account
          ? createDoctor(account)
          : notify("T???o t??i kho???n kh??ng th??nh c??ng nha!");
      });
    } else notify("Ch??a ??i???n ?????y ????? th??ng tin!");
  };
  React.useEffect(() => {
    setShow(isVisited);
  });

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
        <div onClick={handleClose} className="close-icon">
          <i style={{ height: 20, width: 20 }} class="bi bi-x-circle-fill"></i>
        </div>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            padding: 10,
          }}
        >
          <ToastContainer />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              padding: 5,
              flexDirection: "column",
            }}
          >
            <img
              className="img-avatar"
              src={
                profileImg
                  ? profileImg
                  : "../../../../../assets/imgs/add_doctor.png"
              }
              alt="???nh ?????i di???n"
            />
            <input
              id="input"
              accept="image/*"
              name="image-upload"
              type="file"
              onChange={fileSelectedHandle}
            />
            <div className="label">
              <label className="image-upload" htmlFor="input">
                add avatar
              </label>
            </div>
          </div>
        </div>
        <div>
          <InputCustom
            title={"H??? v?? t??n:"}
            placeholder={"Nh???p h??? v?? t??n"}
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
              title={"S??? ??i???n tho???i:"}
              placeholder={"Nh???p s??? ??i???n tho???i"}
              onChangeText={setPhone}
              width={180}
              textInput={phone}
            />
            <InputCustom
              title={"Ch???ng ch???:"}
              placeholder={"Nh???p ch???ng ch???"}
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
                  Chuy??n khoa
                </InputLabel>
                <Select
                  style={{ fontSize: 15, borderColor: "#10908D" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={department}
                  label="Chuy??n khoa"
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
          <div style={{ fontSize: 15, color: "black", fontWeight: 500 }}>
            T??i kho???n ????? ????ng nh???p
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
              placeholder={"Nh???p username"}
              onChangeText={setUsername}
              width={180}
              textInput={username}
            />
            <div style={{ width: 20 }}></div>
            <InputCustom
              title={"Password:"}
              placeholder={"Nh???p password"}
              onChangeText={setPassword}
              width={180}
              textInput={password}
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
            <ButtonCustom
              title={isAdding ? "??ang th??m..." : "Th??m b??c s??"}
              onPress={createAccount}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddDoctor;
