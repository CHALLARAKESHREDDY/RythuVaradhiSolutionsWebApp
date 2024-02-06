import Navbar from '../HomeNavBar/Navbar'
import BottomNavBar from '../NavbarBottom/BottomNavBar'
import './Shop.css'

function Shop(){

    return(
        <div className="Home-Div">
            <Navbar />
            <div className="Home-Content">
           <h1>Shoping Comming Soon</h1>
           </div>
           <BottomNavBar />
        </div>
    )
}

export default Shop