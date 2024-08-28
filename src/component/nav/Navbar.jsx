// import React from 'react'
import Logo from "../../assets/image/Group 3.png";
import Avatar from "../../assets/image/avatar.png";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import navicon from "../../assets/image/nav-icon.png";
import "./navbar.scss";
import { useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer";
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

function Navbar() {
  const [nav, setNav] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = ()=>{
    dispatch(logout())
    navigate("/")
  }
  
  const handleNav =()=>{
    setNav(!nav)
}
  return (
    <nav className="navbar">
      <img className="nav-logo" src={Logo} alt="" />
      <div className="toggle" onClick={handleNav}>
        <img className="navicon" src={navicon} alt="" />
      </div>
      
      <div className="nav-right">
        <BsFillQuestionCircleFill className="question-nav" size={23} />
        <div className="profile-wrap">
          <img src={Avatar} alt="" />
          <span>Tee</span>
          <IoIosArrowDown className="down-nav" />
        </div>
      </div>

      
      <div className={!nav ? "side-nav " : "side-nav-else"}>
      <AiOutlineClose className="close-nav" onClick={handleNav}/> 
        {/* <img src={spkLogo} className="logo logo-android-nav" alt="" /> */}
      <div className="wrap-nav-link">
        <ul>
        <NavLink to="/dash" className="active-link" onClick={handleNav}><li><img src={rocket} alt="" /> <h3>Overview</h3></li></NavLink>
        <NavLink to="/user" className="active-link" onClick={handleNav}><li><img src={user} alt="" /> <h3>User</h3></li></NavLink>
        <NavLink to="/dash" className="active-link" onClick={handleNav}><li><img src={file} alt="" /> <h3>Transaction</h3></li></NavLink>
        <NavLink to="/card" className="active-link" onClick={handleNav}><li><img src={arrowleftright} alt="" /> <h3>Card</h3></li></NavLink>
        <NavLink to="/bank" className="active-link" onClick={handleNav}><li><img src={archive} alt="" /> <h3>Bank Service</h3></li></NavLink>
        <NavLink to="/saving" className="active-link" onClick={handleNav}><li><img src={piggy} alt="" /> <h3>Savings</h3></li></NavLink>
        <NavLink to="/billing" className="active-link" onClick={handleNav}><li><img src={smartphone} alt="" /> <h3>Billing</h3></li></NavLink>
        <NavLink to="/report" className="active-link" onClick={handleNav}> <li><img src={pie} alt="" /> <h3>Report</h3></li></NavLink>
        <NavLink to="/settings" className="active-link " onClick={handleNav}><li><img src={settings} alt="" /> <h3>Settings</h3></li></NavLink>
        
       </ul>
       <span className="nav-logout-wrap" onClick={LogOut}><TbLogout size={15} /> <h3>Logout</h3></span>
      </div>
        
      </div>
    </nav>
    
  );
}

export default Navbar;

{/* <div className="nav-wrap">
      <img className="nav-logo" src={Logo} alt="" />
      <img className="navicon" src={navicon} alt="" />
      <div className="nav-right">
        <BsFillQuestionCircleFill className="question-nav" size={23} />
        <div className="profile-wrap">
          <img src={Avatar} alt="" />
          <span>Tee</span>
          <IoIosArrowDown className="down-nav" />
        </div>
      </div>
      <div className={!nav ? "side-nav transition-all " : "side-nav-else transition-all"} onClick={handleNav}>
        side display
      </div>

    </div> */}