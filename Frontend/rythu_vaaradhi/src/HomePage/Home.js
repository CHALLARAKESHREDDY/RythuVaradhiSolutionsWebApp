import { Link } from 'react-router-dom'
import Navbar from '../HomeNavBar/Navbar'
import BottomNavBar from '../NavbarBottom/BottomNavBar'
import CommingSoonComponent from '../CommingSoon/CommingSoonComponent.js'
import './Home.css'
import { useState } from 'react'
import { useEffect } from 'react'


function Home(){
   const [commingSoon,setShowComingSoon]=useState(false)
   
   const handleTransportationClick = () => {
      setShowComingSoon(true); // Show the coming soon component
      setTimeout(() => setShowComingSoon(false), 2000); // Hide the coming soon component after 2 seconds
    };

    return(
        <div className="Home-Div">
         <Navbar />
         {
            commingSoon?<CommingSoonComponent />:null
         }
            <div className="Home-Content">
                <div className="Crop-Advisory">
                    <div>
                    <h5 className="Crop-Advice-Para">Need information on different types of crops ?</h5>
                    <h4 className="Crop-Advice-Link">Crop Advisory</h4>
                    </div>
                    
                              <img src="https://i.postimg.cc/zG4vK4pW/Picsart-24-01-20-13-57-11-000.png" alt="crop-Img" className="Crop-Advice-Image" />
                    
                    </div>
                <div>
                    
                </div>
                <div style={{width:"95%",marginTop:"20px"}}><h3 className="Services-Head">Services</h3></div>
                <div className="Services">
                <Link  to="/drone_spraying" className="Drone-Spraying" style={{textDecoration:"none"}}>
                     <img src="https://i.postimg.cc/8cd9STRh/drone.png" alt="Drone" className="Drone-Image" />
                     <h3 className="Drone-Head">Drone Spraying</h3>
                      </Link>
                      <div className="Drone-Spraying two" onClick={handleTransportationClick}>
                         <img src="https://i.postimg.cc/BQSW9F1V/harvester.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Tractor/harvester Rentals</h3>
                      </div>
                      <div className="Drone-Spraying three" onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/bJxrZngt/electrician.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Electricians/Mechanics</h3>
                      </div>
                      <div className="Drone-Spraying four" onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/fT9pbwMn/meter.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Soil Testing</h3>
                      </div>
                      <Link  to="/cattle" className="Drone-Spraying five" style={{textDecoration:"none"}}>
                      <img src="https://i.postimg.cc/g0B92hzz/livestock.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Buy/Sell Cattle</h3>
                      </Link>
                      <div className="Drone-Spraying six" onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/HLrsyWXT/wheat.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Farm Labour</h3>
                      </div>
                      <div className="Drone-Spraying seven"  onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/xjFLz8W4/goods-car.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Trasportation</h3>
                      </div>
                      <div className="Drone-Spraying eight" onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/vTK44PZZ/crop.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Crop Selling</h3>
                      </div>
                      <div className="Drone-Spraying nine" onClick={handleTransportationClick}>
                      <img src="https://i.postimg.cc/sXS7CCj4/storage.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Cold Storage/Ware House</h3>
                      </div>
                      
                </div>
                <div style={{width:"95%",marginTop:"20px"}}><h3 className="Services-Head">Others</h3></div>
                <div className="Drone-Spraying ten" onClick={handleTransportationClick}>
                <img src="https://i.postimg.cc/y6PDfHzz/hands.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Know about Goverment schemes</h3>
                  </div>
                  <div className="Drone-Spraying eleven" onClick={handleTransportationClick}>
                <img src="https://i.postimg.cc/dVXJ0Jzr/newspaper.png" alt="Drone" className="Drone-Image" />
                         <h3 className="Drone-Head">Rythu News</h3>
                  </div>
                
            </div>
            <BottomNavBar />
        </div>
   
    )
}

export default Home