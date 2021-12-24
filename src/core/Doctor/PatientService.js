// import { useEffect, useState } from "react";
// import * as React from "react";
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { visuallyHidden } from "@mui/utils";
// import { isLogin } from "../../model/account";
// import Error from "../Error";


// export default function PatientService() {
//     const [order, setOrder] = React.useState("asc");
//     const [orderBy, setOrderBy] = React.useState("calories");
//     const [selected, setSelected] = React.useState([]);
//     const [page, setPage] = React.useState(0);
//     const [dense, setDense] = React.useState(false);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const amount = 10;

//   const headCells = [
//     {
//       id: "name",
//       numeric: false,
//       disablePadding: true,
//       label: "Họ và tên",
//     },
//     {
//       id: "phone",
//       numeric: true,
//       disablePadding: false,
//       label: "Số điện thoại",
//     },
//     {
//       id: "nameService",
//       numeric: true,
//       disablePadding: false,
//       label: "Tên dịch vụ",
//     },
//     {
//       id: "updatedAt",
//       numeric: true,
//       disablePadding: false,
//       label: "Ngày cập nhập",
//     },
//     {
//       id: "information",
//       numeric: true,
//       disablePadding: false,
//       label: "Thông tin bệnh nhân",
//     },
//   ];

//   useEffect(() => {
   
//   }, []);

//   if (isLogin !== "doctor") return <Error />;
//   else
//     return (
//       <div className="home">
//         <div className="menu">
//           <a href="/home">Trang chủ</a>
//           <a style={{ color: "#282c34", background: "#61dafb" }} href="#">
//             Hồ sơ bệnh án
//           </a>
//           <a style={{ color: "#282c34", background: "#61dafb" }} href="#">
//            Bệnh nhân riêng
//           </a>
//           <a href="/">Đăng xuất</a>
//         </div>

//         <div className="main">

//           <div className="title">Danh sách bệnh án </div>

         

//         //
//         </div>
//       </div>
//     );
// }
