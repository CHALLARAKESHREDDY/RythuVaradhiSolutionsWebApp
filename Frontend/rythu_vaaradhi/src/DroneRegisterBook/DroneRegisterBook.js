import React, { useState } from 'react';
import './DroneRegisterBook.css';
import { useNavigate } from 'react-router-dom';

function DroneRegisterBook(){
  const [selectedButton, setSelectedButton] = useState(null);
  const history = useNavigate();

  const handleContinueButton = () => {
    if (selectedButton) {
      history(`/Drone_${selectedButton}`);
    } else {
      // Show a warning message if no button is selected
      alert('Please select either "Book a Drone" or "Register Drone" before continuing.');
    }
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div className='Cattle-Sell-Buy'>
      <div className="Cattle-Buttons-Div">
        <button
          className={`Cattle-Buttons ${selectedButton === 'Register' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('Register')}
        >
          Register Drone
        </button>
        <button
          className={`Cattle-Buttons ${selectedButton === 'Booking' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('Booking')}
        >
          Book a Drone
        </button>
        <button className="Cattle-Buttons ContinueButton" onClick={() => handleContinueButton()}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default DroneRegisterBook;

