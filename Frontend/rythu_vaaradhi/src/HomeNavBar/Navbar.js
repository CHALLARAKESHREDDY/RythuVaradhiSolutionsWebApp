import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import Popup from 'reactjs-popup';
import { IoClose } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { FcCellPhone } from "react-icons/fc";
import { GiReceiveMoney } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi2";
import { FcBusinessman } from "react-icons/fc";
import { PiPlantDuotone } from "react-icons/pi";
import { BsFillCartFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom'

import { NavLink } from 'react-router-dom';

import './Navbar.css';
import MyCrops from '../MyCrops/MyCrops';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img
            src="https://i.postimg.cc/jjjXG5Nd/Farm-Logo-Transparent.png"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="MenuBar">
          <IoMdNotifications style={{fontSize:"24px",marginRight:"8px"}}/>
          <BsFillCartFill style={{fontSize:"22px",marginRight:"10px"}}/>
         <Popup trigger={<button className="MyCrops-Button" ><PiPlantDuotone style={{fontSize:"21px"}}/>My Crops</button>} modal >
           {
            (close)=>(
              <MyCrops close={close}/>
            )
           }
         </Popup>
        <Popup 
          trigger={
            <div className="menu-icon">
              <IoMenu className="IoMenu" />
            </div>
          }
          modal
        >
          {(close) => (
            <div className="Popup-Container" >
              <div className="IoClose-Container"><IoClose  onClick={close} style={{fontSize:"30px"}} className="IoClose"/></div>
              <div className="MyProfile">
                <h3 className="Myprofile-Head"><FcBusinessman style={{fontSize:"21px",marginRight:"1px"}}/>MyProfile</h3>
                <h2 className="Profile-Name">{Cookies.get("fullName")}</h2>
                <h3 className="Profile-Number"><FcCellPhone style={{fontSize:"21px",marginRight:"1px"}} />{Cookies.get("phoneNumber")}</h3>
                <button className="Profile-Edit">Edit Profile <GrFormNextLink style={{fontSize:"20px"}}/></button>
              </div>
              <div className="MyRewardsOrders">
              <div className="MyRewards">
                <GiReceiveMoney style={{fontSize:"27px",marginBottom:"1px"}}/>
                <h3 className="Myprofile-Head">My Rewards</h3>
              </div>
              <div className="MyOrders">
              <HiShoppingBag style={{fontSize:"25px",marginBottom:"1px"}}/>
                <h3 className="Myprofile-Head">My Orders</h3>
              </div>
              </div>
              <div className="ChangeLanguage">
              <FaLanguage style={{fontSize:"25px"}}/>
               <h3 className="Myprofile-Head">English</h3>
                <button className="Myprofile-Head ChangeButton">Change Language</button>
              </div>
              <div className="Contact-Logout">
                <div className="Contact"><h3 className="Myprofile-Head Contact-Head"> <MdContactMail style={{fontSize:"20px",marginRight:"3px"}} />Contact Us</h3> <MdNavigateNext style={{fontSize:"18px"}} className="FcNext"/></div>
                    <hr className="green-horizontal-line" />
                
                <div className="Contact"><h3 className="Myprofile-Head Contact-Head" style={{marginTop:"4px"}}> <BiLogOutCircle style={{fontSize:"22px",marginRight:"2px"}} />Logout</h3> <MdNavigateNext style={{fontSize:"18px"}} className="FcNext"/></div>
 
              </div>
              <h3 className="App-Version">Version App:1.1.1</h3>
              </div>
          
        
            
          )}
        </Popup>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


