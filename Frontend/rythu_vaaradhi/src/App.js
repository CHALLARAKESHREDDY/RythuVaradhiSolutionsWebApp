import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import './App.css';
import OpeningPage from './OpeningsPage/OpeningPage';
import RegisterPage from './RegisterPage/RegisterPage';
import LoginPage from './LoginPage/LoginPage';
import MyContext from './Context/Context';
import Home from './HomePage/Home';
import OTP from './OTPPage/OTP';
import Shop from './Shop/Shop';
import Post from './Post/Post';
import Video from './VideoSection/Video';
import MyCrops from './MyCrops/MyCrops';
import CattlePost from './CattlePost/CattlePost';
import CattleShop from './CattleShop/CattleShop';
import CattleSellBuy from './Cattle_Sell_Buy/CattleSellBuy';
import CattleItem from './Cattle_Item/CatteItem';
import DroneRegisterBook from './DroneRegisterBook/DroneRegisterBook';
import DroneRegister from './DroneRegister/DroneRegister';
import DroneBooking from './DroneBooking/DroneBooking';
import DroneItem from './Drone_Item/DroneItem';

function App() {
  const [language, changeLanguage] = useState(Cookies.get("language"))
  const isLoggedIn = Cookies.get("loggedIn") === true;


  const updateLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
    // You can navigate to a specific route when the language changes if needed
    // navigate('/some-route');
  };

  return (
    <MyContext.Provider value={{ language, changeLanguage: updateLanguage }}>
      <Router>
        <Routes>
        {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Navigate to="/home" replace />
            </>
          ) : (
            <>
          <Route exact path="/" element={<OpeningPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/home" element={<Home />}  />
          <Route path="/shop" element={<Shop />} />
          <Route path="/post" element={<Post />} />
          <Route path="/video" element={<Video />} />
          <Route path="/mycrops" element={<MyCrops />} />
          <Route path="/cattle" element={<CattleSellBuy />} />
          <Route path="/cattle_post" element={<CattlePost/>}/>
          <Route path="/cattle_shop" element={<CattleShop />} />
          <Route path="/cattle_item/:id" element={<CattleItem />} />
          <Route path="/drone_spraying" element={<DroneRegisterBook />} />
          <Route path="/drone_register" element={<DroneRegister />} />
          <Route path="drone_booking" element={<DroneBooking />} />
          <Route path="/drone/:id" element={<DroneItem />} /> 
          </>
          )}

         </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
