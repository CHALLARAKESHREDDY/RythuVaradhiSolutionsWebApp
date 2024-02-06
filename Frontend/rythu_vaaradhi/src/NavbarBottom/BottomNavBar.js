
import { FcHome } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import { PiVideoBold } from "react-icons/pi";
import { FcOldTimeCamera } from "react-icons/fc";
import { Link } from 'react-router-dom'

import './BottomNavbar.css'

function BottomNavBar(){
    return(
        <nav className="Bottom-Nav">
               <Link to="/home" style={{textDecoration:"none"}} >
            <div className="Home-Icon">
               <FcHome style={{fontSize:"28px"}} />
               <h4 className="Home-Head">Home</h4>
            </div></Link>
            <Link  to="/shop" className="Home-Icon"  style={{textDecoration:"none"}}>
               <FcShop style={{fontSize:"28px"}} />
               <h4 className="Home-Head">Shop</h4>
            </Link>
            <Link  to="/post" className="Home-Icon" style={{textDecoration:"none"}}>
               <FcOldTimeCamera style={{fontSize:"28px",color:"red"}} />
               <h4 className="Home-Head">Post</h4>
            </Link>
            <Link  to="/video" className="Home-Icon" style={{textDecoration:"none"}} >
               <PiVideoBold style={{fontSize:"28px",color:"red"}} />
               <h4 className="Home-Head">Video</h4>
            </Link>
        </nav>
    )
}

export default BottomNavBar