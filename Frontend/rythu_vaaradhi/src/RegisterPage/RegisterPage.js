import React, { useState} from 'react';
import MyContext from '../Context/Context';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
          <div className="Welcome-Input-Div" style={{ height: 'auto' }}>
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <label htmlFor="name" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Name' : 'పేరు'}
                <span style={styles.required}>*</span>
              </label>
              <input type="text" id="name" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter your name' : 'మీ పేరు నమోదు చేయండి'} />
            </div>
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <label htmlFor="mobileNumber" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Mobile number' : 'మొబైల్ నంబర్'}
                <span style={styles.required}>*</span>
              </label>
              <input type="number" id="mobileNumber" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter your number' : 'మీ నంబర్‌ని నమోదు చేయండి'} />
            </div>
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <label htmlFor="email" className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Email Id' : 'ఇమెయిల్ ఐడి'}
              </label>
              <input type="email" id="email" className="Welcome-Input" placeholder={value.language === 'English' ? 'Enter your email id' : 'మీ ఇమెయిల్ ఐడి నమోదు చేయండి'} />
            </div>
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <p className="LabelNumber" style={styles.label}>
                {value.language === 'English' ? 'Gender' : 'జెండర్'}
              </p>
              <div style={{ display: 'flex', width: '100%' }}>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                  />
                  {value.language === 'English' ? 'Male' : 'పురుషుడు'}
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                  />
                  {value.language === 'English' ? 'Female' : 'స్త్రీ'}
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="others"
                    checked={gender === 'others'}
                    onChange={handleGenderChange}
                  />
                  <span>{value.language === 'English' ? 'Others' : 'ఇతరాలు'}</span>
                </label>
              </div>
            </div>

            <button className="Welcome-Continue">
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

  