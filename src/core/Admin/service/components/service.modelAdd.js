import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import InputCustom from "../../components/input.custom";
import ButtonCustom from "../../components/button-custom";

import "../../components/styles.css";
import { getDoctorById } from "../../../../model/doctor";
import { addService } from "../../../../model/service";
const ModalAddService = function ({ isVisited, onCancel }) {
  const [show, setShow] = React.useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [nameDoctorAdd, setNameDoctorAdd] = useState("");
  const [doctorIdCheck, setDoctorIdCheck] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [doctor, setDoctor] = useState(null);
  const notify = (message) => toast(message);
  const handleClose = () => {
    setShow(false);
    onCancel();
  };
  React.useEffect(() => {
    setShow(isVisited);
  });

  const onPressCheckDoctorById = () => {
    setDoctor(null);
    setNameDoctorAdd(".....Đang kiểm tra tên bác sĩ.....");
    getDoctorById(doctorIdCheck).then((res) => {
      if (res) {
        setDoctor(res);
        setNameDoctorAdd(res.fullname);
      } else {
        setNameDoctorAdd("Không có bác sĩ cần tìm!");
      }
    });
  };
  const setNewDoctorCheck = (text) => {
    setDoctorIdCheck(text);
  };

  const setNewNameService = (text) => {
    setName(text);
  };

  const setNewDescription = (text) => {
    setDescription(text);
  };

  const setNewDuration = (text) => {
    setDuration(text);
  };

  const setNewPrice = (text) => {
    setPrice(text);
  };

  const onPressAddService = () => {
    if (doctor) {
      let service = {
        name: name,
        description: description,
        doctorId: doctorIdCheck,
        price: price,
        duration: duration,
      };
      addService(service).then((res) => {
        res ? notify("Thêm service thành công!") : notify("Lỗi thêm service!");
      });
    }
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
        <ToastContainer />

        <div onClick={handleClose} className="close-icon">
          <i style={{ height: 20, width: 20 }} class="bi bi-x-circle-fill"></i>
        </div>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            padding: 10,
          }}
        >
          <div></div>
          <div className="title-add">Đăng ký dịch vụ bác sĩ</div>
          <img src="../../../../../../assets/imgs/service_manager.png" />
        </div>
        <div>
          <InputCustom
            title="Tên dịch vụ"
            placeholder={"tên dịch vụ"}
            width={600}
            textInput={name}
            onChangeText={setNewNameService}
          />
          <InputCustom
            title="Mô tả"
            placeholder={"mô tả"}
            width={600}
            textInput={description}
            onChangeText={setNewDescription}
          />
          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              paddingVertical: 10,
            }}
          >
            <InputCustom
              title="Giá tiền"
              placeholder={"giá tiền"}
              width={280}
              textInput={price}
              onChangeText={setNewPrice}
            />
            <InputCustom
              title="Thời gian"
              placeholder={"thời gian"}
              width={280}
              textInput={duration}
              onChangeText={setNewDuration}
            />
          </div>
          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div>
              {" "}
              <InputCustom
                title="ID bác sĩ"
                placeholder={"nhập id bác sĩ cần add dịch vụ"}
                width={500}
                textInput={doctorIdCheck}
                onChangeText={setNewDoctorCheck}
              />
              <div className="name-doctor-check">{nameDoctorAdd}</div>
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <ButtonCustom
                classStyle="button-check"
                title={"check"}
                onPress={onPressCheckDoctorById}
              />
            </div>
          </div>
        </div>
        <div className="button-add-container">
          <ButtonCustom
            classStyle="button-check"
            title={"Add service"}
            onPress={onPressAddService}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(ModalAddService);
