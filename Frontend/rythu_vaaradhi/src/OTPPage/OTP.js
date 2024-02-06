import React, { useRef, useState, useEffect } from 'react';
import MyContext from '../Context/Context';
import './OTP.css';
import { useNavigate } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef(Array(4).fill(null).map(() => React.createRef()));
  const [seconds, setSeconds] = useState(30); // Initial countdown time
  const navigate = useNavigate();

  const handleOTPContinue=()=>{
    navigate("/home")
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
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

          <div className="Welcome-Input-Div" style={{ height: 'auto' }}>
            <div className="Otp-Main-Container">
              <div className="OtpInputContainer">
                {otp.map((digit, index) => (
                  <input
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
          <span style={{textDecoration: "underline",...styles.ResendOTP(seconds)}}>
              {value.language === 'English' ? 'Resend OTP ' : 'మళ్లీ OTP పంపండి '}
            </span>
       
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

