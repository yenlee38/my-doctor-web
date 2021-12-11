const DEPARTMENT = {
  pediatrics: "Nhi",
  otorhinolaryngology: "Tai-Mũi-Họng",
  obstetric: "Phụ sản",
  ophthalmology: "Mắt",
  dental: "Răng-Hàm-Mặt",
  cardiology: "Tim mạch",
  dermatology: "Da liễu",
  laboratory: "Xét nghiệm",
  gastroenterology: "Tiêu hóa",
  musculoskeletal: "Cơ-Xương-Khớp",
  neurology: "Thần kinh",
  respiratory: "Hô hấp",
  nephrology: "Thận",
};

const API_URL = "https://fast-cliffs-01542.herokuapp.com";

const HEADER = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const NUMBER_STATE = {
  USED: "đã khám",
  NOT_USE: "chưa khám",
  CANCEL: "hủy",
  EXPIRED: "quá hạn",
};

module.exports = { DEPARTMENT, API_URL, HEADER, NUMBER_STATE };
