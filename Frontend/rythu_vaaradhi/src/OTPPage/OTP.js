import React, { useRef, useState, useEffect } from 'react';
import MyContext from '../Context/Context';
import './OTP.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import ErrorMessagePuop from '../ErrorMessagePopup/ErrorMessagePopup';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef(Array(4).fill(null).map(() => React.createRef()));
  const [seconds, setSeconds] = useState(30); // Initial countdown time
  const navigate = useNavigate();
  const [resendEnabled, setResendEnabled] = useState(false); // Initially disable resend button
  const [errorMsg,setErrorMsg]=useState({show: false, message: ''})
  const [popupMessage,setPopupMessage]=useState(true)
  const location = useLocation();


  const timer=setTimeout(()=>{
    setPopupMessage(false)
  },2000)


  
  const handleOTPContinue = async() => {
    const phoneNumber=Cookies.get("phoneNumber")
    const fullName = Cookies.get('fullName')
    const {state} = location;

 
        try{
          if (state && (state.fromLoginPage)){
            const response=await axios.post("https://rythu-vaaradhi-backend.onrender.com/otp-verification-login",{otp:otp})
            Cookies.set("LoggedIn",true,{expires:10})
            navigate("/home",{state:{message:"Login Successfull",fromLoginPage:true}})
          }else if (state && state.fromRegister){
            Cookies.set("LoggedIn",true,{expires:10})
            const response=await axios.post('https://rythu-vaaradhi-backend.onrender.com/otp-verification-register',{otp:otp,fullName:fullName,phoneNumber:phoneNumber})
            Cookies.set("farmer_id",response.data.farmer._id)
            navigate("/home", { state: { message:response.data.message, fromOTP: true } });
          }

    }catch (e){
        handleErrorClick(e.response.data.error)
    }
  }

  const handleErrorClick = (message) => {
    setErrorMsg({show: true, message}); // Show the error message
    setTimeout(() => setErrorMsg({show: false, message: ''}), 2000); // Hide the error message after 2 seconds
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setResendEnabled(true); // Enable resend button after timer completes
        clearInterval(timer); // Clear the timer
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleOtpChange = (index, value) => {
    // Ensure that the entered value is a single digit
    const singleDigitValue = value.replace(/[^0-9]/g, '').charAt(0);

    const newOtp = [...otp];
    newOtp[index] = singleDigitValue;

    if (index === 0 && singleDigitValue === '' && otpInputs.current[index].current) {
      // If the first input is empty, focus remains in the first input
      otpInputs.current[index].current.focus();
    } else if (singleDigitValue !== '' && index < otp.length - 1 && otpInputs.current[index + 1].current) {
      // Move focus to the next input box if a digit is entered
      otpInputs.current[index + 1].current.focus();
    } else if (index > 0 && singleDigitValue === '' && otpInputs.current[index - 1].current) {
      // Move focus back to the previous input box if deleting a digit
      otpInputs.current[index - 1].current.focus();
    }

    setOtp(newOtp);
  };

  const handleResendOTP = async () => {
    try {
      const phoneNumber = Cookies.get("phoneNumber");
      await axios.post('https://rythu-vaaradhi-backend.onrender.com/resend-otp', { phoneNumber });
      setSeconds(30); // Reset the timer
      setResendEnabled(false); // Disable resend button again
    } catch (error) {
      handleErrorClick("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <MyContext.Consumer>
      {(value) => (
        <div className="OTPDiv">
          <div className="Welcome-Head-Para">
            <h1 className="WelcomeHead">
              {value.language === 'English' ? 'Verification' : 'ధరణి'}
            </h1>
            <p className="WelcomePara" style={value.language === 'English' ? { fontSize: '18px' } : { fontSize: '15px' }}>
              {value.language === 'English'
                ? 'Please enter the OTP received on the entered mobile number'
                : 'దయచేసి ఎంటర్ చేసిన మొబైల్ నంబర్ పైగా దగ్గరగా పొందిన OTP నమోదు చేయండి'}
            </p>
          </div>
          {
            errorMsg.show ? <ErrorMessagePuop text={errorMsg.message} /> : null
          }
          {
               popupMessage && <ErrorMessagePuop text={"OTP sent Successfully"} color={"#145A32"}/>
         }

          <div className="Welcome-Input-Div" style={{ height: 'auto' }}>
            <div className="Otp-Main-Container">
              <div className="OtpInputContainer">
                {otp.map((digit, index) => (
                  <input
                  autoFocus={index === 0 ? true : false}
                    key={index}
                    type="number"
                    className="OtpInput"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={otpInputs.current[index]}

                  />
                ))}
              </div>
            </div>
          </div>
          <button className="OTP-Continue" onClick={handleOTPContinue}>
            {value.language === 'English' ? 'Continue' : 'కొనసాగించు'}
          </button>
          
        
          <h3 style={{ ...styles.ResendOTP(seconds)}}>
          <button onClick={handleResendOTP} disabled={!resendEnabled} className="Resend-Button">
          <span style={{textDecoration: "underline",...styles.ResendOTP(seconds)}}  onClick={handleResendOTP} disabled={!resendEnabled}>
              {value.language === 'English' ? 'Resend OTP ' : 'మళ్లీ OTP పంపండి '}
            </span></button>
       
            <span style={styles.In}> {value.language === 'English' ? 'in' : 'లో'} </span>
            <span style={styles.Seconds}>{seconds < 10 ? `0${seconds}` : seconds} {value.language === 'English' ? 'Seconds' : 'సెకన్లు'}</span>
          </h3>
        </div>
      )}
    </MyContext.Consumer>
  );
}

const styles = {
  ResendOTP: (seconds) => ({
    fontSize: '15px',
    marginTop: '30px',
    color: seconds > 0 ? '#898888' : '#049976', // Change color based on seconds
  }),
  Seconds: {
    color: '#FC7474 ',
    marginLeft: '5px'
  },
  In:{
    marginLeft:"3px",
  }
};

export default OTP;