import React, { useState } from 'react';
import './CattleSellBuy.css';
import { useNavigate } from 'react-router-dom';

function CattleSellBuy() {
  const [selectedButton, setSelectedButton] = useState(null);
  const history = useNavigate();

  const handleContinueButton = () => {
    if (selectedButton) {
      history(`/Cattle_${selectedButton}`);
    } else {
      // Show a warning message if no button is selected
      alert('Please select either "Post Cattle" or "Buy Cattle" before continuing.');
    }
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div className='Cattle-Sell-Buy'>
      <div className="Cattle-Buttons-Div">
        <button
          className={`Cattle-Buttons ${selectedButton === 'Post' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('Post')}
        >
          Post Cattle
        </button>
        <button
          className={`Cattle-Buttons ${selectedButton === 'Shop' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('Shop')}
        >
          Buy Cattle
        </button>
        <button className="Cattle-Buttons ContinueButton" onClick={() => handleContinueButton()}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default CattleSellBuy;

