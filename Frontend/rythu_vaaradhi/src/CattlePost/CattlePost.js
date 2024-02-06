// CattlePost.js
import React, { useState } from 'react';
import axios from 'axios';
import './CattlePost.css';

const CattlePost = () => {
  const [file, setFile] = useState(null);
  const [additionalFiles1, setAdditionalFiles1] = useState(null);
  const [additionalFiles2, setAdditionalFiles2] = useState(null);
  const [farmerId, setFarmerId] = useState('');
  const [category, setCategory] = useState('');
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

    if (!file || !additionalFiles1 || !additionalFiles2 || !farmerId || !category || !price || !location || !description) {
      // Display an alert for validation error
      alert('Please fill in all mandatory fields, including all three images');
      return;
    }

    const formData = new FormData();
    formData.append('data1', file);
    formData.append('data2', additionalFiles1);
    formData.append('data3', additionalFiles2);
    formData.append('farmerId', farmerId);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:402/upload', formData);
      // Display an alert for success
      alert('Cattle post uploaded successfully');
      console.log(response.data);
      // You can handle additional success behavior here if needed
    } catch (error) {
      console.error('Error uploading cattle post:', error);
      // Display an alert for error
      alert('Error uploading cattle post. Please try again.');
      // You can handle additional error behavior here if needed
    }
  };

  return (
    <div className="Cattle-Post">
      <h2>Sell your Cattle</h2>
      <form onSubmit={handleSubmit} className="Cattle-Form">
      <div className="Form-Item">
          <label htmlFor="Farmer" className="Label-Cattle">
            Farmer ID:
          </label>
          <input
            className="Cattle-Post-Input"
            id="Farmer"
            type="text"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
            placeholder="Enter Farmer ID"
          />
        </div>
        <br />
        <div className="Form-Item">
          <label htmlFor='Category' className="Label-Cattle">
            Category:
          </label>
          <select
            className="Cattle-Post-Input"
            id="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select Category"
          >
            <option value="Cow">Cow</option>
            <option value="Ox">Ox</option>
            <option value="Buffalo">Buffalo</option>
            <option value="Hen">Hen</option>
            <option value="Pig">Pig</option>
            <option value="Sheep">Sheep</option>
            <option value="Goat">Goat</option>
            <option value="Horse">Horse</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Duck">Duck</option>
            <option value="Camel">Camel</option>
          </select>
        </div>

        <br />
        <div className="Form-Item">
          <label htmlFor='Price' className="Label-Cattle">
            Price:
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
            Description:
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

        <button className="Upload-Button" type="submit">Post</button>
      </form>
    </div>
  );
};

export default CattlePost;





// CattlePost.js
