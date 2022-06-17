import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { getAllAccountByAdmin } from "../../../model/account";
import { getAllPatient } from "../../../model/patient";
import { formatDate } from "../../../utils/formats";
import ButtonCustom from "../components/button-custom";
import ModalPatient from "../components/patient.modal";

export default function PatientManagerHome() {
  const [patients, setPatients] = useState([]);
  const [listPatient, setListPatient] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modelData, setModalData] = useState();
  const dense = false;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllAccountByAdmin().then((listAccount) => {
      setAccounts(listAccount);
      getAllPatient().then((res) => {
        if (res) {
          setPatients(
            res.sort(function (x, y) {
              return x.updatedAt - y.updatedAt;
            })
          );
          setListPatient(
            res.sort(function (x, y) {
              return x.updatedAt - y.updatedAt;
            })
          );
        }
      });
    });
  };

  const headCells = [
    {
      id: "fullName",
      disablePadding: true,
      label: "Họ và tên",
    },
    {
      id: "gender",
      disablePadding: false,
      label: "Giới tính",
    },
    {
      id: "birthDate",
      disablePadding: false,
      label: "Ngày sinh",
    },
    {
      id: "address",
      disablePadding: false,
      label: "Địa chỉ",
    },
    {
      id: "account",
      disablePadding: false,
      label: "Tài khoản",
    },
  ];

  const CustomAccount = ({ doctorId }) => {
    return getAccountByDoctorId(doctorId)?.isHidden ? (
      <Tooltip title={"Ngừng hoạt động"} placement="right">
        <img src="../../../../assets/imgs/account_unable.png" />
      </Tooltip>
    ) : (
      <Tooltip title={"Còn hoạt động"} placement="right">
        <img src="../../../../assets/imgs/account.png" />
      </Tooltip>
    );
  };

  const getAccountByDoctorId = (doctorId) => {
    const account = accounts.filter((account) => account.id === doctorId)[0];
    console.log({ account });
    return account;
  };

  const findByName = (name) => {
    if (name !== "") {
      return listPatient.filter(
        (d) => d.fullName.includes(name) || !d.fullName
      );
    } else return listPatient;
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = patients.map((n) => n.fullname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <ButtonCustom
          title={"Thêm bệnh nhân"}
          onPress={() => {
            setModalData();
            setIsShowModal(true);
          }}
        />
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  return (
    <div>
      <ModalPatient
        show={isShowModal}
        patient={modelData}
        close={() => {
          getData();
          setIsShowModal(false);
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={"../../../../assets/imgs/doctor.png"}
            style={{ width: 70, height: 70 }}
          />
          <div
            style={{
              fontSize: 25,
              fontWeight: "500",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Quản lý tài khoản bệnh nhân
          </div>
        </div>
        <div
          style={{
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <input
            style={{
              border: "none",
              fontSize: 14,
              width: 250,
              outline: "none",
            }}
            type="text"
            placeholder="Nhập tên bệnh nhân"
            aria-label="Search"
            onChange={(event) => setPatients(findByName(event.target.value))}
          />
          <img
            src={"../../../../assets/imgs/search.png"}
            style={{ width: 35, height: 35 }}
          />
        </div>
      </div>
      <div>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={patients.length}
            />
            <TableBody>
              {stableSort(patients, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <div
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{
                                height: 40,
                                width: 40,
                                borderRadius: 40,
                                margin: 5,
                              }}
                              src={row.avatar}
                            />{" "}
                            <div>{row.fullName}</div>
                          </div>
                        </TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">
                          {formatDate(row.birthDate)}
                        </TableCell>
                        <TableCell align="center">{row.address}</TableCell>
                        <TableCell
                          align="center"
                          className="pointer"
                          onClick={() => {
                            setModalData(row);
                            setIsShowModal(true);
                          }}
                        >
                          <CustomAccount doctorId={row.id} />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
