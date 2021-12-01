import { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="background">
      <div>Yêu cầu đăng nhập</div>
      <a className="buttonlink" href="/">
        Chuyển đến trang đăng nhập
      </a>
    </div>
  );
}
