import { isLogin } from "../../model/account";
import DoctorHome from "./DoctorHome";
import NurseHome from "./NurseHome";
import AdminHome from "../Admin/AdminHome";
import React from "react";
import Signin from "../../auth/Signin";

export default function Home(props) {
  if (isLogin === "nurse") return <NurseHome />;
  else if (isLogin === "doctor") return <DoctorHome />;
  else if (isLogin === "ADMIN") return <AdminHome/>
  else {
    return <Signin />;
  }

}
