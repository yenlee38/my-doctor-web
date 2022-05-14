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
import * as React from "react";
import { getAllAccountByAdmin } from "../../../model/account";
import { getAllDoctor } from "../../../model/doctor";
import ModalAddDoctor from "../components/account.add";
import ModalEditDoctor from "../components/account.edit";
import ButtonCustom from "../components/button-custom";
import "./styles.css";
export default function DoctorManagerHome() {
  const [doctors, setDoctors] = React.useState([]);
  const [listDoctor, setListDoctor] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [status, setStatus] = React.useState("");
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);
  const [doctorSelected, setDoctorSelected] = React.useState();
  const dense = false;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    getAllAccountByAdmin().then((listAccount) => {
      setAccounts(listAccount);
      getAllDoctor().then((res) => {
        if (res) {
          console.log(res);
          console.log(
            res.sort(function (x, y) {
              return y.updatedAt - x.updatedAt;
            })
          );

          setDoctors(
            res.sort(function (x, y) {
              return x.updatedAt - y.updatedAt;
            })
          );
          setListDoctor(
            res.sort(function (x, y) {
              return x.updatedAt - y.updatedAt;
            })
          );
        }
      });
    });
  }, []);

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "fullname",
      numeric: false,
      disablePadding: false,
      label: "Họ và tên",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Số điện thoại",
    },
    {
      id: "department",
      numeric: false,
      disablePadding: false,
      label: "Chuyên khoa",
    },

    {
      id: "education",
      numeric: false,
      disablePadding: false,
      label: "Chứng chỉ",
    },
    {
      id: "account",
      numeric: false,
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
    if (name !== "") return listDoctor.filter((d) => d.fullname.includes(name));
    else return listDoctor;
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
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
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
      const newSelecteds = doctors.map((n) => n.fullname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - doctors.length) : 0;

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
        <ButtonCustom title={"Thêm bác sĩ"} onPress={showModalAddDoctor} />
      </Toolbar>
    );
  };

  const showModalAddDoctor = () => {
    setIsShowModal((prev) => !prev);
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleChangeStatus = (event) => {
    let s = event.target.value;
    setStatus(event.target.value);
    if (s === "") setDoctors(listDoctor);
    else {
      setDoctors(listDoctor.filter((l) => l.status === s));
    }
  };

  return (
    <div>
      <ModalAddDoctor isVisited={isShowModal} onCancel={showModalAddDoctor} />
      <ModalEditDoctor
        isVisited={isShowModalEdit}
        onCancel={() => {
          setIsShowModalEdit(false);
        }}
        doctor={doctorSelected}
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
            Quản lý tài khoản bác sĩ
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
            placeholder="Nhập tên bác sĩ"
            aria-label="Search"
            onChange={(event) => setDoctors(findByName(event.target.value))}
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
              rowCount={doctors.length}
            />
            <TableBody>
              {stableSort(doctors, getComparator(order, orderBy))
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
                        <TableCell>{row.id}</TableCell>
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
                            <div>{row.fullname}</div>
                          </div>
                        </TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.department}</TableCell>
                        <TableCell align="center">{row.education}</TableCell>
                        <TableCell
                          align="center"
                          className="pointer"
                          onClick={() => {
                            setDoctorSelected(row);
                            setIsShowModalEdit(true);
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
          count={doctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
