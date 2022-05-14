import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DEPARTMENT } from "../../../constant";
import {
  disableAccount,
  enableAccount,
  getAccount,
  resetPass,
} from "../../../model/account";
import { updateAvatarDoctor, updateProfile } from "../../../model/doctor";
import ButtonCustom from "./button-custom";
import InputCustom from "./input.custom";
import "./styles.css";
const ModalEditDoctor = function ({ isVisited, onCancel, doctor }) {
  const [show, setShow] = React.useState(false);
  const [fullName, setFullName] = useState(doctor?.fullname);
  const [phone, setPhone] = useState(doctor?.phone);
  const [education, setEducation] = useState(doctor?.education);
  const [department, setDepartment] = useState(doctor?.department);
  const [doctorId, setDoctorId] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isHidden, setIsHidden] = useState(0);
  const [changePass, setChangePass] = useState("");
  React.useEffect(() => {
    setFullName(doctor?.fullname);
    setPhone(doctor?.phone);
    setEducation(doctor?.education);
    setDepartment(doctor?.department);
    setProfileImg(doctor?.avatar);
    getAccount(doctor?.id).then((account) => {
      if (account) {
        setDoctorId(account.id);
        setPassword(account.password);
        setUsername(account.username);
        setIsHidden(account.isHidden);
      }
    });
  }, [doctor]);

  const notify = (message) => toast(message);
  const fileSelectedHandle = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
        console.log(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateAvatarDoctor = () => {
    setIsAdding(true);
    if (doctor.avatar != profileImg) {
      const fd = new FormData();
      fd.append("image", selectedFile, selectedFile.name);
      updateAvatarDoctor(doctorId, fd).then((res) => {
        if (res) {
          //TODO: update info
          updateProfile(doctorId, fullName, department, phone, education).then(
            (result) => {
              setIsAdding(false);
              result
                ? notify("Chỉnh sửa bác sĩ thành công!")
                : notify("Lỗi không sửa được bác sĩ");
              setTimeout(() => {
                handleClose();
              }, 3000);
            }
          );
        }
      });
    } else {
      updateProfile(doctorId, fullName, department, phone, education).then(
        (result) => {
          setIsAdding(false);
          result
            ? notify("Chỉnh sửa bác sĩ thành công!")
            : notify("Lỗi không sửa được bác sĩ");
          setTimeout(() => {
            handleClose();
          }, 3000);
        }
      );
    }
  };

  const updateDoctor = (id) => {
    handleUpdateAvatarDoctor();
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
  const editAccount = () => {
    isHidden == 1 ? disableAccount(doctorId) : enableAccount(doctorId);
    if (handleCreateAccount()) {
      setIsAdding(true);
      if (changePass) {
        resetPass(username, changePass).then((account) => {
          setIsAdding(false);
          account
            ? updateDoctor(account)
            : notify("Chỉnh sửa tài khoản không thành công!");
        });
      } else {
        updateDoctor(doctorId);
      }
    } else notify("Chưa điền đầy đủ thông tin!");
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

  const formSubmit = (event) => {
    //event.preventDefault();
  };

  const onValueRadiusChange = (event) => {
    setIsHidden(event.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      keyboard={false}
      contentClassName="modal-width"
      backdropClassName="modal-backdrop"
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
            {" "}
            <img className="img-avatar" src={profileImg} />
            <input
              id="input"
              accept="image/*"
              name="image-upload"
              type="file"
              onChange={fileSelectedHandle}
            />
            <div className="label">
              <label className="image-upload" htmlFor="input">
                edit avatar
              </label>
            </div>
          </div>
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
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 15, color: "black", fontWeight: 500 }}>
              Tài khoản để đăng nhập
            </div>
            <form className="radio-form" onSubmit={formSubmit}>
              <div className="radio">
                <div className="radio-container">
                  {" "}
                  <input
                    type="radio"
                    value={0}
                    checked={isHidden == 0}
                    onChange={onValueRadiusChange}
                  />
                </div>
                <label className="label-radius">enable</label>
              </div>
              <div className="radio">
                <div className="radio-container">
                  <input
                    type="radio"
                    value={1}
                    checked={isHidden == 1}
                    onChange={onValueRadiusChange}
                  />
                </div>
                <label className="label-radius">disable</label>
              </div>
            </form>
          </div>
          <div style={{ height: 10 }}></div>
          <div
            style={{
              display: "flex",

              flexDirection: "row",
            }}
          >
            <InputCustom
              title={"Username:"}
              placeholder={"Nhập username"}
              onChangeText={setUsername}
              width={290}
              textInput={username}
              disabled={true}
            />
            <div style={{ width: 20 }}></div>
            <InputCustom
              title={"Password:"}
              placeholder={"Nhập password"}
              onChangeText={setPassword}
              width={290}
              textInput={password}
              disabled={true}
            />
          </div>
          <div style={{ fontSize: 15, color: "black", fontWeight: 500 }}></div>
          <InputCustom
            title={"Reset password:"}
            placeholder={"Nhập password mới mà bạn muốn thay đổi"}
            onChangeText={setChangePass}
            width={600}
            textInput={changePass}
          />
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
              title={isAdding ? "Đang chỉnh sửa..." : "Sửa thông tin bác sĩ"}
              onPress={editAccount}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditDoctor;
