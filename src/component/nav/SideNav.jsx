// import React from 'react'
import "./sidenav.scss"
// import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { Link, useNavigate } from "react-router-dom";
import file from "../../assets/image/file-text.png";
import piggy from "../../assets/image/piggy-bank.png";
import user from "../../assets/image/vector.png";
import rocket from "../../assets/image/rocket.png";
import settings from "../../assets/image/settings.png"
import smartphone from "../../assets/image/smartphone.png"
import pie from "../../assets/image/pie-chart.png"
import arrowleftright from "../../assets/image/arrow-left-right.png"
import archive from "../../assets/image/archive.png"
import { TbLogout } from "react-icons/tb";

function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector((state) => state.user.activeUser);
  const LogOut = ()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className="sidenav-wrap">
      <div className="side-profile-wrap">
        <div className="siide-profile-img-wrap">
          <h3>Tu</h3>
        </div>
        <div className="siide-profile-details-wrap">
          <div className="side-name-wrap">
           Welcome 
          </div>
          <h3>{ activeUser.firstName} { activeUser.lastName} </h3>
        </div>
      </div>
      <ul>
      <Link to="./dash"><li><img src={rocket} alt="" /> <h3>Overview</h3></li></Link>
        <Link to="./user"><li><img src={user} alt="" /> <h3>User</h3></li></Link>
        <Link to="/dash"><li><img src={file} alt="" /> <h3>Transaction</h3></li></Link>
        <Link to="/card"><li><img src={arrowleftright} alt="" /> <h3>Card</h3></li></Link>
        <Link to="/bank"><li><img src={archive} alt="" /> <h3>Bank Service</h3></li></Link>
        <Link to="/saving"><li><img src={piggy} alt="" /> <h3>Savings</h3></li></Link>
        <Link to="/billing"><li><img src={smartphone} alt="" /> <h3>Billing</h3></li></Link>
        <Link to="/report"><li><img src={pie} alt="" /> <h3>Report</h3></li></Link>
        <Link to="/seting"><li><img src={settings} alt="" /> <h3>Settings</h3></li></Link>
        <li onClick={LogOut}><TbLogout size={15} />  <h3>Logout</h3></li>
      </ul>
      {/* <span className="nav-logout-wrap" onClick={LogOut}><TbLogout size={15} /> <h3>Logout</h3></span> */}


    </div>
  )
}

export default SideNav