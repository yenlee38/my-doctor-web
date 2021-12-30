import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { getAllDoctor } from "../../model/doctor";
import { getAllPatient } from "../../model/patient";
import { getAllRegistration } from "../../model/registration";
import { getAllService } from "../../model/service";
import { getAllAccount } from "../../model/account";
import { balanceFormat, changeColorDoctorRegistration, formatDateTime } from "../../utils/formats";
import AlertMessage from "../Component/AlertMessage";

export default function Payment() {
  const [registrations, setRegistrations] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [regDatas, setRegDatas] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isVisitedAlert, setIsVisitedAlert] = React.useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  let lPatients = [];
  let lDoctors = [];
  let lService = [];
  let lAccount = [];
  React.useEffect(() => {
    getAllDoctor().then((res) => {
      setDoctors(res);
      lDoctors = res;
      getAllPatient().then((res) => {
        setPatients(res);
        lPatients = res;
        getAllService().then((res) => {
          lService = res;
          getAllAccount().then((res) => {
            lAccount = res;
            getAllRegistration().then((res) => {
              if (res) setRegistrations(res);
              convertListRegistration(
                res,
                lPatients,
                lDoctors,
                lService,
                lAccount
              );
            });
          });
        });
      });
    });
  },[]);


  const onCancel = () => {
    setIsVisitedAlert(false);
    window.location.reload();
  }

  const onCancelNotUpdate = () => {
    setIsVisitedAlert(false);
  }

  const [idUpdate, setIdUpdate] = React.useState("");
  const[nameUpdate, setNameUpdate] = React.useState("");
  const[statusUpdate, setStatusUpdate] = React.useState("");
  const[nameAction, setNameAction] = React.useState("");

  const updateStatus = (id, name, status) => {
   
    setNameAction(status);
    setStatusUpdate(status);
    setNameUpdate(name);
    setIdUpdate(id);
    setIsVisitedAlert(true);
  }


  let datas = [];

  const formatDate = (date) => {
    return formatDateTime(date);
  };

  const formatPrice = (price) => {
    return balanceFormat(price);
  };

  const convertListRegistration = async (
    list,
    patients,
    doctors,
    services,
    accounts
  ) => {
    await list.forEach((item) => {
      datas.push(
        createData(
          item.id,
          getNamePatientById(patients, item.patientId),
          getPhonePatientById(accounts, item.patientId),
          getNameDoctorById(doctors, item.doctorId),
          item.name,
          item.updatedAt,
          getPriceService(services, item.serviceId),
          item.status
        )
      );
    });
    setRegDatas(datas);
  };

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Họ và tên",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Số điện thoại",
    },
    {
      id: "nameDoctor",
      numeric: true,
      disablePadding: false,
      label: "Bác sĩ phụ trách",
    },
    {
      id: "nameService",
      numeric: true,
      disablePadding: false,
      label: "Tên dịch vụ",
    },
    {
      id: "updatedAt",
      numeric: true,
      disablePadding: false,
      label: "Ngày cập nhập",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Giá tiền",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Edit",
    },
  ];

  const getPriceService = (lService, id) => {
    let price = id;
    if (lService.length > 0) {
      lService.forEach((p) => {
        if (p.id == id) price = p.price;
      });
    }
    return price;
  };

  const getPhonePatientById = (lAccount, id) => {
    let phone = id;
    if (lAccount.length > 0) {
      lAccount.forEach((p) => {
        if (p.id == id) phone = p.username;
      });
    }
    return phone;
  };

  const getNamePatientById = (lPatients, id) => {
    let name = id;
    if (lPatients.length > 0) {
      lPatients.forEach((p) => {
        if (p.id == id) {
          name = p.fullName;
        }
      });
    }

    return name;
  };

  const getNameDoctorById = (lDoctors, id) => {
    let nameDoctor = id;
    if (lDoctors.length > 0) {
      lDoctors.forEach((p) => {
        if (p.id == id) nameDoctor = p.fullname;
      });
    }
    return nameDoctor;
  };

  function createData(
    id,
    name,
    phone,
    nameDoctor,
    nameService,
    updatedAt,
    price,
    status
  ) {
    return {
      id,
      name,
      phone,
      nameDoctor,
      nameService,
      updatedAt,
      price,
      status
    };
  }

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
          <TableCell padding="checkbox">

          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
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
      const newSelecteds = regDatas.map((n) => n.name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - regDatas.length) : 0;

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
       
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Quản lý thanh toán dịch vụ
          </Typography>
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const colorStatus = (status) => {
      return changeColorDoctorRegistration(status);
  }

  return (


    <div>
          <AlertMessage 
    isVisited = {isVisitedAlert}
    id = {idUpdate}
    name = {nameUpdate}
    status = {statusUpdate}
    nameAction = {nameAction}
    onCancel = {onCancel}
    onCancelNotUpdate = {onCancelNotUpdate}
  />
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
              rowCount={regDatas.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                     rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(regDatas, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                    //   onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.nameDoctor}</TableCell>
                      <TableCell align="right">{row.nameService}</TableCell>
                      <TableCell align="right">
                        <div>
                        {formatDate(row.updatedAt)}
                        
                        </div>
                        <div  style={{
                              padding: 5,
                              backgroundColor: colorStatus(row.status),
                              borderRadius: 8,
                              color: "white",
                              alignItems: "center",
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight:'400',
                              boxShadow:
                                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                              cursor: "pointer",
                            }}>
                            {row.status}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(row.price)}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={
                            {
                              // justifyContent: "center",
                              // alignItems: "center",
                              // flexDirection: "row",
                            }
                          }
                        >
                          { row.status == "PENDDING" ? (<div>
                            <div
                            style={{
                              padding: 5,
                              backgroundColor: "#1EE494",
                              borderRadius: 5,
                              color: "white",
                              alignItems: "center",
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight:'bold',
                              boxShadow:
                                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                              cursor: "pointer",
                            }}

                            onClick = {() => {
                              updateStatus(row.id, row.nameService, "CONFIRMED");
                            }}
                          >
                            Confirmed
                          </div> 
                           <div
                           style={{
                             padding: 5,
                             backgroundColor: "#FF0000",
                             borderRadius: 5,
                             color: "white",
                             alignItems: "center",
                             justifyContent:'center',
                             textAlign:'center',
                             fontWeight:'bold',
                             boxShadow:
                               "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                             cursor: "pointer",
                             marginTop: 5
                           }}

                           onClick = {() => {
                             updateStatus(row.id, row.nameService, "CANCEL");
                           }}
                         >
                           Denied
                         </div>
                            </div>
                          
                          ):null}
                          {row.status == "CONFIRMED" ? (
                            <div
                            style={{
                              padding: 5,
                              backgroundColor: "#FF0000",
                              borderRadius: 5,
                              color: "white",
                              alignItems: "center",
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight:'bold',
                              boxShadow:
                                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
                              cursor: "pointer",
                              marginTop: 5
                            }}

                            onClick = {() => {
                              updateStatus(row.id, row.nameService, "CANCEL");
                            }}
                          >
                            Denied
                          </div>
                          ): null}
                        </div>
                      </TableCell>
                    </TableRow>
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
          count={regDatas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    
      
    </div>
   
    </div>
  );
}
