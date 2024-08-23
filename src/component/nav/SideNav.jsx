// import React from 'react'
import "./sidenav.scss"
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";
// import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
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

function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <h3>test</h3><span>user</span>
          </div>
          <h3>test@user.com</h3>
        </div>
      </div>
      <ul>
        <li><img src={rocket} alt="" /> <h3>Overview</h3></li>
        <Link to="./user"><li><img src={user} alt="" /> <h3>User</h3></li></Link>
        <li><img src={file} alt="" /> <h3>Transaction</h3></li>
        <li><img src={arrowleftright} alt="" /> <h3>Transfers</h3></li>
        <li><img src={archive} alt="" /> <h3>Deposit</h3></li>
        <li><img src={piggy} alt="" /> <h3>Savings</h3></li>
        <li><img src={smartphone} alt="" /> <h3>Billing</h3></li>
        <li><img src={pie} alt="" /> <h3>Report</h3></li>
        <li><img src={settings} alt="" /> <h3>Settings</h3></li>
        
      </ul>

    </div>
  )
}

export default SideNav