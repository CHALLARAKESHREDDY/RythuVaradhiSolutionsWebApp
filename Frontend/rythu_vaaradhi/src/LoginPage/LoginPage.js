import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context/Context';
import './LoginPage.css';
import axios from 'axios';
import ErrorMessagePuop from '../ErrorMessagePopup/ErrorMessagePopup';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleTransportationClick = (message) => {
    setErrorMsg(message);
    setTimeout(() => setErrorMsg(''), 2000);
  };

  const handleContinue = async (value) => {
    if (mobileNumber.trim().length === 10) {
      try {
        const response = await axios.post('https://strikeout-serverside.onrender.com/farmer-login', { mobileNumber });
        navigate("/home", { state: { message: "Login successful", fromLoginPage: true } });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          handleTransportationClick(error.response.data.message);
        } else {
          handleTransportationClick("An error occurred. Please try again later.");
        }
      }
    } else {
      setErrorMsg('Please enter a valid mobile number');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <MyContext.Consumer>
      {({ language }) => (
        <div className="WelcomeDiv">
          <div className="Welcome-Head-Para">
            <h1 className="WelcomeHead">
              {language === 'English' ? 'Welcome Back' : 'పునఃస్వాగతం'}
            </h1>
            <h3 className="WelcomePara" style={{ fontSize: language === 'English' ? '18px' : '15px' }}>
              {language === 'English' ? 'You have been missed' : 'వ్యవసాయాన్ని అందమైన వృత్తిగా మారుద్దాం'}
            </h3>
          </div>
          {errorMsg && <ErrorMessagePuop text={errorMsg} />}
          <div className="Welcome-Input-Div">
            <div style={{ width: '100%' }}>
              <label htmlFor="number" className="LabelNumber">
                {language === 'English' ? 'Mobile number' : 'మొబైల్ నంబర్'}
                <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                id="number"
                className="Welcome-Input"
                placeholder={language === 'English' ? 'Enter your number' : 'మీ నంబర్‌ని నమోదు చేయండి'}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <button className="Welcome-Continue" onClick={() => handleContinue(language)}>
              {language === 'English' ? 'Continue' : 'కొనసాగించు'}
            </button>
            <h3 className="Register">
              {language === 'English' ? 'Are you a new member?' : 'మీరు కొత్త సభ్యులా?'}
              <span className="RegisterLink" onClick={handleRegisterClick}>
                {language === 'English' ? 'Register now' : 'ఇప్పుడు నమోదు చేసుకోండి'}
              </span>
            </h3>
          </div>
        </div>
      )}
    </MyContext.Consumer>
  );
}

const styles = {
  required: {
    color: 'red',
    marginLeft: '2px',
    fontSize: '18px',
  },
};

export default LoginPage;
