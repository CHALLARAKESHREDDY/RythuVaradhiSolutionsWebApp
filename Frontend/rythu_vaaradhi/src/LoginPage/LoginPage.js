import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context/Context';
import './LoginPage.css';
import axios from 'axios';
import ErrorMessagePuop from '../ErrorMessagePopup/ErrorMessagePopup';
import Cookies from 'js-cookie';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleTransportationClick = (message) => {
    setErrorMsg(message);
    setTimeout(() => setErrorMsg(''), 2000);
  };

  const handleContinue = async () => {
    if (mobileNumber.trim().length === 10) {
      try {
        const response = await axios.post('https://rythu-vaaradhi-backend.onrender.com/farmer-login', { mobileNumber });
        Cookies.set("fullName",response.data.existingFarmer.fullName)
        Cookies.set("phoneNumber",response.data.existingFarmer.phoneNumber)
        navigate("/otp", { state: {fromLoginPage: true } });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          handleTransportationClick(error.response.data.message);
        } else {
          handleTransportationClick("An error occurred. Please try again later.");
        }
      }
    } else {
      handleTransportationClick("please enter valid mobile number");
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
            
            <h3 style={styles.register}>
              {language === 'English' ? '   Are you a new member ?' : 'మీరు కొత్త సభ్యులా ?'}
              <span style={styles.registerLink} onClick={() => handleRegisterClick()}>
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
  label: {
    display: 'block',
    marginBottom: '4px',
    color: '#333',
    position: 'relative',
  },
  required: {
    color: 'red',
    marginLeft: '2px',
    fontSize: '18px',
  },
  register: {
    fontSize: '15px',
    marginTop: '0px',
    color: '#555',
    textAlign: 'center'

  },
  registerLink: {
    color: '#049976',
    marginLeft: '5px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  warning: {
    color: 'red',
    fontSize: '13px',
    marginLeft: '10px',
    marginBottom:"15px",
    marginTop:"0px",
    alignSelf: 'flex-start',
  },
};

export default LoginPage;
