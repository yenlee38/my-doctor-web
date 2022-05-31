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
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as React from "react";
import { getAllDoctor } from "../../../model/doctor";
import { getAllService } from "../../../model/service";
import ButtonCustom from "../components/button-custom";
import { balanceFormat } from "../../../utils/formats";
import ModalAddService from "./components/service.modelAdd";
export default function ServiceManager() {
  const [services, setServices] = React.useState([]);
  const [listServices, setListServices] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);
  const [serviceSelected, setServiceSelected] = React.useState();
  const dense = false;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllDoctor().then((lDoctor) => {
      getAllService().then((lService) => {
        convertDataTolist(lDoctor, lService);
      });
    });
  };

  function createData(
    id,
    name,
    doctorName,
    doctorId,
    duration,
    description,
    price,
    createdAt,
    updatedAt
  ) {
    return {
      id,
      name,
      doctorName,
      doctorId,
      duration,
      description,
      price,
      createdAt,
      updatedAt,
    };
  }

  const convertDataTolist = async (lDoctor, lService) => {
    let listServiceTemp = [];
    await lService.forEach((service) => {
      listServiceTemp.push(
        createData(
          service.id,
          service.name,
          getDoctorNameByDoctorId(lDoctor, service.doctorId),
          service.doctorId,
          service.duration,
          service.description,
          service.price,
          service.createdAt,
          service.updatedAt
        )
      );
    });
    setServices([...listServiceTemp]);
    setListServices([...listServiceTemp]);
  };

  const getDoctorNameByDoctorId = (lDoctors, doctorId) => {
    let name = "";
    lDoctors.forEach((doctor) => {
      if (doctorId === doctor.id) name = doctor.fullname;
    });
    return name;
  };

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Tên dịch vụ",
    },
    {
      id: "doctorName",
      numeric: true,
      disablePadding: false,
      label: "Bác sĩ phụ trách",
    },
    {
      id: "duration",
      numeric: true,
      disablePadding: false,
      label: "Thời gian",
    },

    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Giá tiền",
    },
  ];

  const findById = (name) => {
    if (name !== "")
      return listServices.filter((d) => d.fullname.includes(name));
    else return listServices;
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
      const newSelecteds = services.map((n) => n.fullname);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - services.length) : 0;

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
        <ButtonCustom title={"Thêm dịch vụ"} onPress={showModalAddService} />
      </Toolbar>
    );
  };

  const showModalAddService = () => {
    setIsShowModal((prev) => !prev);
    getData();
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const formatPrice = (price) => {
    return balanceFormat(price);
  };

  return (
    <div>
      <ModalAddService isVisited={isShowModal} onCancel={showModalAddService} />
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
            src={"../../../../../assets/imgs/service.png"}
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
            Quản lý dịch vụ bệnh nhân
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
            placeholder="Nhập id bác sĩ"
            aria-label="Search"
            onChange={(event) => setServices(findById(event.target.value))}
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
              rowCount={services.length}
            />
            <TableBody>
              {stableSort(services, getComparator(order, orderBy))
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
                            <div>{row.name}</div>
                          </div>
                        </TableCell>
                        <TableCell align="center">{row.doctorName}</TableCell>
                        <TableCell align="center">{row.duration}</TableCell>
                        <TableCell align="center">
                          {formatPrice(row.price)}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pointer"
                          onClick={() => {
                            setServiceSelected(row);
                            setIsShowModalEdit(true);
                          }}
                        ></TableCell>
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
          count={services.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
