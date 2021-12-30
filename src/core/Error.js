import { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="background" style={{backgroundColor: 'white', justifyContent: 'flex-start', flex: 1, alignItems:'center', flexDirection: 'column'}} >
       <img
        alt="My Doctor"
        src="../../assets/imgs/404.gif"
        style={{ width: "40%", height: "90%" }}
      />
      
     <div style={{flexDirection: 'row', padding: 5,
        backgroundColor: "#32C1CD",
        borderRadius: 5,
        color: "white",
        alignItems: "center",
        justifyContent:'center',
        textAlign:'center',
        fontWeight:'400',
        boxShadow:
          "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
        cursor: "pointer",}}>
     <a  style={{
        color: 'white',
        direction:'none',
        textDecoration:'none',
        fontSize: 20, marginRight: 10
      }} href="/login">
        Chuyển đến trang đăng nhập
      </a>

      <img  src="../../assets/imgs/login.svg"/>
     </div>
    </div>
  );
}
