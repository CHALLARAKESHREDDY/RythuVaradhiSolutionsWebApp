// CattlePost.js
import React, { useState } from 'react';
import axios from 'axios';
import './DroneRegister.css';
import Cookies from 'js-cookie';

const DroneRegister = () => {
  const [file, setFile] = useState(null);
  const [additionalFiles1, setAdditionalFiles1] = useState(null);
  const [additionalFiles2, setAdditionalFiles2] = useState(null);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAdditionalFileChange1 = (e) => {
    setAdditionalFiles1(e.target.files[0]);
  };

  const handleAdditionalFileChange2 = (e) => {
    setAdditionalFiles2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !additionalFiles1 || !additionalFiles2 || !price || !location || !description) {
      // Display an alert for validation error
      alert('Please fill in all mandatory fields, including all three images');
      return;
    }

    const formData = new FormData();
    formData.append('data1', file);
    formData.append('data2', additionalFiles1);
    formData.append('data3', additionalFiles2);
    formData.append('farmerId', Cookies.get("farmer_id"));
    formData.append('price', price);
    formData.append('location', location);
    formData.append('description', description);

    try {
      const response = await axios.post('https://rythu-vaaradhi-backend.onrender.com/upload-drone-details', formData);
      // Display an alert for success
      alert('Drone Registered successfully');
      // You can handle additional success behavior here if needed
    } catch (error) {
      console.error('Error Drone Registering:', error);
      // Display an alert for error
      alert('Error Drone Registering. Please try again.');
      // You can handle additional error behavior here if needed
    }
  };

  return (
    <div className="Cattle-Post">
      <h2>Register Your Drone</h2> 
      <form onSubmit={handleSubmit} className="Cattle-Form">
      
        <div className="Form-Item">
          <label htmlFor='Price' className="Label-Cattle">
            Price per acre:
          </label>
          <input
            className="Cattle-Post-Input"
            id="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </div>
        <br />
        <div className="Form-Item">
          <label htmlFor='Location' className="Label-Cattle">
            Location:
          </label>
          <input
            className="Cattle-Post-Input"
            id="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
          />
        </div>
        <br />
        <div className="Form-Item">
          <label htmlFor='Description' className="Label-Cattle">
            Description (tell something that you want to convey to the buyer):
          </label>
          <input
            className="Cattle-Post-Input"
            id="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
         <br />
        <div className="Form-Item">
          <label htmlFor='Image' className="Label-Cattle">
            Image 1:
          </label>
          <input
            id="Image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="Cattle-Post-Input Image-Input"
          />
        </div>

        <div className="Form-Item">
          <label htmlFor='AdditionalImage1' className="Label-Cattle">
            Image 2:
          </label>
          <input
            id="AdditionalImage1"
            type="file"
            accept="image/*"
            onChange={handleAdditionalFileChange1}
            className="Cattle-Post-Input Image-Input"
          />
        </div>

        <div className="Form-Item">
          <label htmlFor='AdditionalImage2' className="Label-Cattle">
            Image 3:
          </label>
          <input
            id="AdditionalImage2"
            type="file"
            accept="image/*"
            onChange={handleAdditionalFileChange2}
            className="Cattle-Post-Input Image-Input"
          />
        </div>
         <br />
        <button className="Upload-Button" type="submit">Post</button>
      </form>
    </div>
  );
};

export default DroneRegister;