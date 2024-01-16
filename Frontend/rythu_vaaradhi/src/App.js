import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie'
import './App.css';
import OpeningPage from './OpeningsPage/OpeningPage';
import RegisterPage from './RegisterPage/RegisterPage';
import LoginPage from './LoginPage/LoginPage';
import MyContext from './Context/Context';

function App() {
  const [language, changeLanguage] = useState(Cookies.get("language"))

  const updateLanguage = (newLanguage) => {
    changeLanguage(newLanguage);
    // You can navigate to a specific route when the language changes if needed
    // navigate('/some-route');
  };

  return (
    <MyContext.Provider value={{ language, changeLanguage: updateLanguage }}>
      <Router>
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
