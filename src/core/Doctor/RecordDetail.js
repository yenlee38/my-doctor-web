import { useEffect, useState } from "react";
import { isLogin } from "../../model/account";
import { getRecord } from "../../model/record";
import Error from "../Error";

export default function RecordDetail() {
  const [record, setRecord] = useState();

  useEffect(() => {
    getRecord(window.location.pathname.split("/")[2])
      .then((result) => setRecord(result))
      .catch((err) => console.error(err));
  }, []);

  // const prescription = array.map((medicine) => (
  //   <tr>
  //     <th>{medicine.name}</th>
  //     <th>{medicine.amount}</th>
  //     <th>{medicine.use}</th>
  //     <th>{medicine.price}</th>
  //   </tr>
  // ));

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
          <div>Người bệnh: {record.patientName}</div>
          <div>Ngày khám: {record.date}</div>
          <div>Tên bệnh: {record.name}</div>
          <table>
            <tr>
              <th>Tên thuốc</th>
              <th>Liều lượng</th>
              <th>Cách dùng</th>
              <th>Đơn giá</th>
            </tr>
            {/* {prescription} */}
          </table>
          <button onClick={() => null}>In</button>
        </div>
      </div>
    );
}
