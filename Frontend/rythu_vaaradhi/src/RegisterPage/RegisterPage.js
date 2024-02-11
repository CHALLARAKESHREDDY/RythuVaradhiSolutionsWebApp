import React, { useState} from 'react';
import MyContext from '../Context/Context';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import ErrorMessagePuop from '../ErrorMessagePopup/ErrorMessagePopup';
import axios from 'axios';
import Cookies from 'js-cookie'

function RegisterPage() {
  const [farmerData,setFarmerData]=useState({fullName: '',mobileNumber: '',})
  const [errorMsg,setErrorMsg]=useState({show: false, message: ''})
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFarmerData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleErrorClick = (message) => {
    setErrorMsg({show: true, message}); // Show the error message
    setTimeout(() => setErrorMsg({show: false, message: ''}), 2000); // Hide the error message after 2 seconds
  };

  const handleRegisterClick =async () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    if ((farmerData.fullName.trim().length <= 3) || (!nameRegex.test(farmerData.fullName.trim()))) {
      handleErrorClick("Please enter a valid name");
      return;
    } else if ((farmerData.mobileNumber.trim().length < 10)||((farmerData.mobileNumber.trim().length > 10))) {
      handleErrorClick("Please enter a valid mobile number");
      return;
    }

    try {
      let response = await axios.post('https://strikeout-serverside.onrender.com/farmer-register', {
        fullName:farmerData.fullName,phoneNumber:farmerData.mobileNumber
      })
         Cookies.set('fullName', (farmerData.fullName).toString(), { expires: 1 });
         Cookies.set("phoneNumber",(farmerData.mobileNumber),{expires :1})
          navigate("/otp");
    }
      catch(e){
        handleErrorClick(e.response.data.error)
      }
    
  };
  
  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <MyContext.Consumer>
      {(value) => (
        <div className="RegisterDiv">
          <div className="Welcome-Head-Para">
            <h1 className="WelcomeHead">
              {value.language === 'English' ? 'Get Started' : 'ప్రారంభించండి'}
            </h1>
            <h3 className="WelcomePara">
              {value.language === 'English' ? 'by creating your account' : 'మీ ఖాతాను సృష్టించండి'}
            </h3>
          </div>
          {
            errorMsg.show ? <ErrorMessagePuop text={errorMsg.message} /> : null
          }
          <div className="Welcome-Input-Div" style={{ height: 'auto' }}>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <label htmlFor="name" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Full Name' : 'పూర్తి పేరు'}
                <span style={styles.required}>*</span>
              </label>
              <input type="text" id="name" name="fullName" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter yourfull name' : 'మీ పూర్తి పేరు నమోదు చేయండి'} onChange={handleInputChange}/>
            </div>
            <div style={{ width: '100%', marginBottom: '30px' }}>
              <label htmlFor="mobileNumber" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Mobile number' : 'మొబైల్ నంబర్'}
                <span style={styles.required}>*</span>
              </label>
              <input type="number" id="mobileNumber" name="mobileNumber" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter your mobile number' : 'మీ మొబైల్ నంబర్‌ని నమోదు చేయండి'}  onChange={handleInputChange}/>
            </div>
            {/*<div style={{ width: '100%', marginBottom: '20px' }}>
              <label htmlFor="email" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Email Id' : 'ఇమెయిల్ ఐడి'}
              </label>
              <input type="email" id="email" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter your email id' : 'మీ ఇమెయిల్ ఐడి నమోదు చేయండి'} />
      </div>*/}
            

            <button className="Welcome-Continue" onClick={handleRegisterClick}>
              {value.language === 'English' ? 'Continue' : 'కొనసాగించు'}
            </button>
            <h3 style={styles.register}>
              {value.language === 'English' ? 'Already a member ?' : 'ఇప్పటికే సభ్యుడా ?'}
              <span style={styles.registerLink} onClick={handleSignInClick}>
                {value.language === 'English' ? 'Sign In' : 'సైన్ ఇన్'}
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
    marginTop: '25px',
    color: '#555',
  },
  registerLink: {
    color: '#015441',
    marginLeft: '5px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default RegisterPage;

  