import Navbar from '../HomeNavBar/Navbar'
import BottomNavBar from '../NavbarBottom/BottomNavBar'
import './Video.css'

function Video(){

    return(
        <div className="Home-Div">
            <Navbar />
            <div className="Home-Content">
           <h1> Videos Comming Soon</h1>
           </div>
           <BottomNavBar />
        </div>
    )
}

export default Video