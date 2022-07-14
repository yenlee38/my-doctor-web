import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GENDER, ROLES } from "../../../constant";
import ButtonCustom from "./button-custom";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  disableAccount,
  enableAccount,
  getAccount,
  resetPass,
  signup,
} from "../../../model/account";
import { updateProfile, updateAvatar } from "../../../model/patient";
import InputCustom from "./input.custom";
import "./styles.css";
import { formatDateSQL } from "../../../utils/formats";

const ModalPatient = function ({ patient, show, close }) {
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [address, setAddress] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [isHidden, setIsHidden] = useState(0);

  useEffect(() => {
    if (patient) {
      setFullName(patient.fullName);
      setGender(patient.gender);
      setBirthDate(formatDateSQL(patient.birthDate));
      setAddress(patient.address);
      setProfileImg(patient.avatar);
      getAccount(patient.id).then((account) => {
        if (account) {
          setUsername(account.username);
          setIsHidden(account.isHidden);
        }
      });
    } else {
      setBirthDate(formatDateSQL(new Date()));
      setUsername("");
      setPassword("");
      setFullName("");
      setAddress("");
      setGender(GENDER.MALE);
      setProfileImg("../../../../../assets/imgs/add_doctor.png");
    }
  }, [patient]);

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

  const update = async (id) => {
    if (fullName && gender && birthDate && address) {
      if (!patient || patient.avatar !== profileImg) {
        const fd = new FormData();
        fd.append("image", selectedFile, selectedFile.name);
        await updateAvatar(fd, id).then((res) => {
          updateProfile(
            id,
            fullName,
            birthDate,
            gender,
            address,
            res.patient.avatar
          );
        });
      } else {
        await updateProfile(
          id,
          fullName,
          birthDate,
          gender,
          address,
          patient.avatar
        );
      }
    }
  };

  const save = async () => {
    setIsAdding(true);
    if (patient) {
      isHidden === 1 ? disableAccount(patient.id) : enableAccount(patient.id);
      if (password) resetPass(username, password);
      await update(patient.id);
    } else if (username && password) {
      await signup(username, password, ROLES.PATIENT).then((account) =>
        account
          ? update(account.id)
          : toast("Tạo tài khoản không thành công nha!")
      );
    }
    setIsAdding(false);
    close();
  };

  const onValueRadiusChange = (event) => setIsHidden(event.target.value);

  return (
    <Modal
      show={show}
      centered={true}
      keyboard={false}
      contentClassName="modal-width"
      backdropClassName="modal-backdrop"
    >
      <Modal.Body>
        <div onClick={close} className="close-icon">
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
            <img className="img-avatar" src={profileImg} alt="ảnh đại diện" />
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
                  Giới tính
                </InputLabel>
                <Select
                  style={{ fontSize: 15, borderColor: "#10908D" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={gender}
                  label="Giới tính"
                  onChange={(event) => setGender(event.target.value)}
                >
                  <MenuItem value={GENDER.FEMALE}>{GENDER.FEMALE}</MenuItem>
                  <MenuItem value={GENDER.MALE}>{GENDER.MALE}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Ngày sinh"
                type="date"
                value={birthDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>
            <InputCustom
              title={"Địa chỉ:"}
              placeholder={"Nhập địa chỉ"}
              onChangeText={setAddress}
              width={180}
              textInput={address}
            />
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
            {patient && (
              <div className="radio-form">
                <div className="radio">
                  <div className="radio-container">
                    <input
                      type="radio"
                      value={0}
                      checked={isHidden === 0}
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
                      checked={isHidden === 1}
                      onChange={onValueRadiusChange}
                    />
                  </div>
                  <label className="label-radius">disable</label>
                </div>
              </div>
            )}
          </div>
          <div style={{ height: 10 }}></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <PhoneInput
              country="vn"
              value={username}
              onChange={setUsername}
              inputStyle={{ height: 50 }}
              disabled={patient}
              buttonStyle={{ height: 50 }}
              containerStyle={{ marginTop: 20 }}
            />
            <div style={{ width: 20 }}></div>
            <InputCustom
              title={"Password:"}
              placeholder={"Nhập password"}
              onChangeText={setPassword}
              width={290}
            />
          </div>
          <div style={{ fontSize: 15, color: "black", fontWeight: 500 }}></div>
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
              title={isAdding ? "Đang lưu..." : "Lưu"}
              onPress={save}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPatient;
