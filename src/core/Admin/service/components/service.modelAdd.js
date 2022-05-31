import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import InputCustom from "../../components/input.custom";
import ButtonCustom from "../../components/button-custom";

import "../../components/styles.css";
const ModalAddService = function ({ isVisited, onCancel }) {
  const [show, setShow] = React.useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const notify = (message) => toast(message);
  const handleClose = () => {
    setShow(false);
    onCancel();
  };
  React.useEffect(() => {
    setShow(isVisited);
  });

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
          />
          <InputCustom title="Mô tả" placeholder={"mô tả"} width={600} />
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
            />
            <InputCustom
              title="Thời gian"
              placeholder={"thời gian"}
              width={280}
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
              />
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <ButtonCustom classStyle="button-check" title={"check"} />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddService;
