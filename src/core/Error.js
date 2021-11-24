import { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div>
      <div>Yêu cầu đăng nhập</div>
      <a href="/">Chuyển đến trang đăng nhập</a>
    </div>
  );
}
