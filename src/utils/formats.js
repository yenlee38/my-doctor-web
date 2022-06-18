import Moment from "moment";

export const formatDateTime = (date) => {
  Moment.locale("en");
  return Moment(date).format("DD/MM/YYYY, h:mm:ss a");
};

export const formatDateSQL = (date) => {
  Moment.locale("en");
  return Moment(date).format("yyyy-MM-DD");
};

export const formatDate = (date) => {
  Moment.locale("en");
  return Moment(date).format("DD/MM/yyyy");
};

export const balanceFormat = (price) => {
  var price_format = "";
  if (price === 0) return "0 Đ";
  if (price < 1000) return price + " Đ";

  var priceString = price + "";
  while (priceString.length - 3 > 0) {
    price_format =
      "." + priceString.substring(priceString.length - 3) + price_format;
    priceString = priceString.substring(0, priceString.length - 3);
  }
  price_format = priceString + price_format + " Đ";
  return price_format;
};

export const changeColorDoctorRegistration = (status) => {
  if (status === "CONFIRMED") return "#00A19D";
  if (status === "CREATED") return "#34BE82";
  if (status === "PENDDING") return "#FF5F7E";
  if (status === "EXPIRED") return "#FFCA03";
  if (status === "CANCEL") return "#F90716";

  return "#fff";
};

export const shortMessage = (message) => {};

export const convertTimestampToDate = (timestamp) => {
  if (timestamp) {
    let date = timestamp.toDate().toDateString();
    let time = timestamp.toDate().toLocaleTimeString("en-US");
    return {
      date: date,
      time: time,
    };
  }
  // let date = new Date(timestamp);
  return {
    date: "date",
    time: "time",
  };
};
