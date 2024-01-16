/*import { useEffect, useState } from 'react';
import {useNavigate  } from 'react-router-dom'; // Import useHistory from react-router-dom
import './OpeningPage.css';
import MyContext from '../Context/Context';

function OpeningPage() {
  const [page, changePage] = useState("Welcome");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const history = useNavigate (); // Use useHistory hook to get access to history


  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      // Navigate to the login page or perform other actions
      history('/login'); // Update the route accordingly
    } else {
      // Show a warning message if no language is selected
      alert('Please select a language to continue');
    }
  };
  

  useEffect(() => {
    const timerId = setTimeout(() => {
      changePage("Language");
    }, 4000);

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(timerId);
    };
  }, []); // Add an empty dependency array to run the effect only once on mount

  return (
    <MyContext.Consumer>{
      value
      }
      {(() => {
        switch (page) {
          case "Welcome":
            return (
              <div className="OpeningsDiv">
                <div className="OpeningSubDiv">
                  <h2>Welcome to </h2>
                  <h1 className="OpeningHead">RythuVaaradhi</h1>
                  <p className="OpeningPara">A farmers App</p>
                </div>
                <img
                  src="https://i.postimg.cc/P5vfYkmX/Picsart-24-01-14-18-20-22-964.png"
                  alt="openingImgage"
                  className="openingImage"
                />
              </div>
            );
          case "Language":
            return (
                <div className="OpeningsLanguageDiv">
                    <img src="https://i.postimg.cc/HsQDjBGV/Picsart-24-01-14-19-44-47-112.png" alt="OpeningsLanguageImg" className='OpeningsLanguageImg' />
                    <div className="LanguageDiv">
                        <div>
                        <h1 className="Choose">Choose</h1>
                        <h2 style={{fontWeight:"500",fontSize:"20px"}}>your language</h2>
                        </div>
                  
                  <div className="LanguageButtonsDiv">
                    <button
                      className={`LanguageButton ${selectedLanguage === 'English' ? 'selected' : ''}`}
                      onClick={() => handleLanguageSelect('English')}
                    >
                      English
                    </button>
                    <button
                      className={`LanguageButton ${selectedLanguage === 'Telugu' ? 'selected' : ''}`}
                      onClick={() => handleLanguageSelect('Telugu')}
                      style={{fontWeight:"520"}}
                    >
                      తెలుగు

                    </button>
                    <button
                      className='LanguageButton ContinueButton'
                      onClick={handleContinue}

                    >
                      Continue

                    </button>
                    
                
                  </div></div>
                </div>
              );
          default:
            return null;
        }
      })()}
    </MyContext>
  );
}

export default OpeningPage; 8*/





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context/Context';
import './OpeningPage.css';
import Cookies from 'js-cookie';

function OpeningPage() {
  const [page, changePage] = useState("Welcome");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const history = useNavigate();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = (updateLanguage) => {
  
    if (selectedLanguage) {
      Cookies.set("language",selectedLanguage,{expires:1})
      // Update the language in the context
      updateLanguage(selectedLanguage);
      // Navigate to the login page or perform other actions
      history('/login'); // Update the route accordingly
    } else {
      // Show a warning message if no language is selected
      alert('Please select a language to continue');
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      changePage("Language");
    }, 4000);

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(timerId);
    };
  }, []); // Add an empty dependency array to run the effect only once on mount

  return (
    <MyContext.Consumer>
      {(value) => (
        <>
          {(() => {
            switch (page) {
              case "Welcome":
                return (
                  <div className="OpeningsDiv">
                    <div className="OpeningSubDiv">
                      <h2>Welcome to </h2>
                      <h1 className="OpeningHead">RythuVaaradhi</h1>
                      <p className="OpeningPara">A farmers App</p>
                    </div>
                    <img
                      src="https://i.postimg.cc/P5vfYkmX/Picsart-24-01-14-18-20-22-964.png"
                      alt="openingImage"
                      className="openingImage"
                    />
                  </div>
                );
              case "Language":
                return (
                  <div className="OpeningsLanguageDiv">
                    <img src="https://i.postimg.cc/HsQDjBGV/Picsart-24-01-14-19-44-47-112.png" alt="OpeningsLanguageImg" className='OpeningsLanguageImg' />
                    <div className="LanguageDiv">
                      <div>
                        <h1 className="Choose">Choose</h1>
                        <h2 style={{ fontWeight: "500", fontSize: "20px" }}>your language</h2>
                      </div>

                      <div className="LanguageButtonsDiv">
                        <button
                          className={`LanguageButton ${selectedLanguage === 'English' ? 'selected' : ''}`}
                          onClick={() => handleLanguageSelect('English')}
                        >
                          English
                        </button>
                        <button
                          className={`LanguageButton ${selectedLanguage === 'Telugu' ? 'selected' : ''}`}
                          onClick={() => handleLanguageSelect('Telugu')}
                          style={{ fontWeight: "520" }}
                        >
                          తెలుగు
                        </button>

                        <button
                          className='LanguageButton ContinueButton'
                          onClick={() => handleContinue(value.changeLanguage)}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </>
      )}
    </MyContext.Consumer>
  );
}

export default OpeningPage;
