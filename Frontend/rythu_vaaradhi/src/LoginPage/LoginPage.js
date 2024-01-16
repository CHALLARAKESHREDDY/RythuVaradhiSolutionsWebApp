import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context/Context';
import './LoginPage.css';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleContinue = (value) => {
    if (mobileNumber.trim().length === 10) {
      // Mobile number is entered, navigate to /register
      
    } else {
      // Show warning message
      setShowWarning(true);
    }
  };

  const handleRegisterClick = (value) => {
    // Handle the register link click, you can use value.language to get the selected language
    navigate('/register');
  };

  return (
    <MyContext.Consumer>
      {(value) => (
        <div className="WelcomeDiv">
          <div className="Welcome-Head-Para">
            <h1 className="WelcomeHead">
              {value.language === 'English' ? 'Welcome Back' : 'పునఃస్వాగతం'}
            </h1>
            <h3 className="WelcomePara" style={value.language === 'English' ? { fontSize: '18px' } : { fontSize: '14px' }}>
              {value.language === 'English' ? 'You have been missed' : 'వ్యవసాయాన్ని అందమైన వృత్తిగా మారుద్దాం'}
            </h3>
          </div>
          <div className="Welcome-Input-Div">
            <div style={{ width: '100%' }}>
              <label htmlFor="number" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? ' Mobile number' : 'మొబైల్ నంబర్'}
                <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                id="number"
                className="Welcome-Input"
                placeholder={value.language === 'English' ? 'Enter your number' : 'మీ నంబర్‌ని నమోదు చేయండి'}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            {showWarning && (
              <div className="WarningMessage" style={styles.warning}>
                {value.language === 'English' ? 'Please enter a valid mobile number' : 'దయచేసి చెల్లుబాటు అయ్యే మొబైల్ నంబర్‌ను నమోదు చేయండి'}
              </div>
            )}
            <button className="Welcome-Continue" onClick={() => handleContinue(value)}>
              {value.language === 'English' ? '  Continue' : '   కొనసాగించు'}
            </button>
            <h3 style={styles.register}>
              {value.language === 'English' ? '   Are you a new member ?' : 'మీరు కొత్త సభ్యులా ?'}
              <span style={styles.registerLink} onClick={() => handleRegisterClick(value)}>
                {value.language === 'English' ? 'Register now' : 'ఇప్పుడు నమోదు చేసుకోండి'}
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
    marginTop: '20px',
    color: '#555',
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
