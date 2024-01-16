import { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [gender, setGender] = useState('male');
  const navigate = useNavigate();


  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSignInClick = (value) => {

    navigate('/login');
  };

  return (
    <div className="RegisterDiv">
      <div className="Welcome-Head-Para">
        <h1 className="WelcomeHead">Get Started</h1>
        <h3 className="WelcomePara">by creating your account</h3>
      </div>
      <div className="Welcome-Input-Div" style={{ height: 'auto' }}>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <label htmlFor="name" className="LabelNumber" style={styles.label}>
            Name<span style={styles.required}>*</span>
          </label>
          <input type="text" id="name" className="Welcome-Input" placeholder="Enter your name" />
        </div>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <label htmlFor="number" className="LabelNumber" style={styles.label}>
            Mobile number<span style={styles.required}>*</span>
          </label>
          <input type="number" id="mobileNumber" className="Welcome-Input" placeholder="Enter your number" />
        </div>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <label htmlFor="email" className="LabelNumber" style={styles.label}>
            Email Id
          </label>
          <input type="email" id="email" className="Welcome-Input" placeholder="Enter your email id" />
        </div>
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <p className="LabelNumber" style={styles.label}>
            Gender
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
              Male
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              Female
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="others"
                checked={gender === 'others'}
                onChange={handleGenderChange}
              />
              <span>Others</span>
            </label>
          </div>
        </div>

        <button className="Welcome-Continue">Continue</button>
        <h3 style={styles.register}>
          Already a member ?<span style={styles.registerLink} onClick={() => handleSignInClick()}>Sign In</span>
        </h3>
      </div>
    </div>
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
    color: '#015441',
    marginLeft: '5px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default RegisterPage;

  