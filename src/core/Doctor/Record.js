import { useEffect, useState } from "react";
import {
  AiFillStepBackward,
  AiFillBackward,
  AiFillForward,
  AiFillStepForward,
} from "react-icons/ai";

import { isLogin } from "../../model/account";
import { findByPatientName, getAll } from "../../model/record";
import Error from "../Error";

export default function Record() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const amount = 10;

  let list;

  const showList = () => {
    // if (search === "")
    //   getAll()
    //     .then((result) => setData(result))
    //     .catch((err) => console.error(err));
    // else
    //   findByPatientName(search)
    //     .then((result) => setData(result))
    //     .catch((err) => console.error(err));
    // const last = amount * page;
    // const first = last - amount;
    // const list = data.map((record, index) => {
    //   let STT = index;
    //   if (index >= first && index < last)
    //     return (
    //       <tr>
    //         <th>{STT++}</th>
    //         <th>{record.patientName}</th>
    //         <th>{record.name}</th>
    //         <th>{record.date}</th>
    //         <th>
    //           <a href={"/record-detail/" + record.id}>Xem</a>
    //         </th>
    //       </tr>
    //     );
    // });
  };

  useEffect(() => {
    showList();
  });

  if (isLogin !== "doctor") return <Error />;
  else
    return (
      <div>
        <div>
          <a href="/home">Trang chủ</a>
          <a href="#">Hồ sơ bệnh án</a>
          <a href="/">Đăng xuất</a>
        </div>

        <div>
          <div>
            Tìm kiếm
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nhập tên bệnh nhân"
            />
          </div>

          <a href="/insert-record">Thêm</a>
          <dialog></dialog>

          <div>
            Danh sách bệnh án
            <table>
              <tr>
                <th>STT</th>
                <th>Người bệnh</th>
                <th>Tên bệnh</th>
                <th>Ngày khám</th>
                <th></th>
              </tr>
              {/* {list.splice(amount * (page - 1), amount)} */}
            </table>
            <div>Tổng: {data.length}</div>
            <div>
              <AiFillStepBackward onClick={() => setPage(1)} />
              <AiFillBackward
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
              />
              <input
                text="number"
                value={page}
                onChange={(event) => setPage(event.target.value)}
              />
              <AiFillForward onClick={() => setPage(page + 1)} />
              <AiFillStepForward
                onClick={() => setPage(parseInt(data.length / amount) + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
