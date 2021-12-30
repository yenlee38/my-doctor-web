import React, {useState} from 'react';
import Payment from './Payment';
import NavAdmin from '../Component/nav/NavAdmin';

const AdminHome = (props) =>{
  const [inactive, setInactive] = useState(false);

  return (
   <>
   <NavAdmin onCollapse={(inactive) => {
    console.log(inactive);
    setInactive(inactive);
  }}/>
    <div className={`container ${inactive ? "inactive" : ""}`}>
     <div className = "home">
       <div className = "main">
         <Payment/>
       </div>
     </div>
   </div>
   </>
 )
}

export default AdminHome;