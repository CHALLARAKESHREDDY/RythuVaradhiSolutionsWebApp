import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './DroneItem.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageDisplay = ({ imageId }) => {
  const imageUrl0 = `http://localhost:402/drone-images/${imageId}?index=0`;
  const imageUrl1 = `http://localhost:402/drone-images/${imageId}?index=1`;
  const imageUrl2 = `http://localhost:402/drone-images/${imageId}?index=2`;

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // Set centerMode to true
    centerPadding: '0', // Adjust centerPadding as needed
  };

  return (
    <div className="slider-drone-container">
    <Slider {...settings} className="Slider-Cattle">
      <div className="Slider-Item">
        <img src={imageUrl0} alt="Cattle Post 0" className="Cattle-Image-Item" />
      </div>
      <div className="Slider-Item">
        <img src={imageUrl1} alt="Cattle Post 1" className="Cattle-Image-Item" />
      </div>
      <div className="Slider-Item">
        <img src={imageUrl2} alt="Cattle Post 2" className="Cattle-Image-Item" />
      </div>
    </Slider>
    </div>
  );
};

const DroneItem = () => {
  const [droneData, setDroneData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getCattleItemData = async () => {
      try {
        const response = await fetch(`https://strikeout-serverside.onrender.com/drone_item/${id}`);
        const data = await response.json();
        setDroneData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Drone data:', error);
        setIsLoading(false);
      }
    };

    getCattleItemData();
  }, [id]);

  const renderDroneItemDetails = () => {
    const { price, description, location,farmer} =droneData;
    console.log(droneData)

    return (
      <div className="blog-info">
        <ImageDisplay imageId={id} />
        <div className="Cattle-Details">
          <h3 className="Cattle-Details-Head">Drone Details</h3>
          <h3 className="blog-details-title">Price per acre : {price}</h3>
        <h3 className="blog-details-title">Description: {description}</h3>

        </div>
        <div className="Cattle-Details">
          <h3 className="Cattle-Details-Head">Owner Details</h3>
        <h3 className="blog-details-title">Name : {farmer.fullName}</h3>
        <h3 className="blog-details-title">Location : { location}</h3>
        <button className="Drone-BookNow-Button" >Book Now</button>
        </div>
      </div>
    );
  };

  return (
    <div className="blog-container">
      {isLoading ? (
      <div className="Home-Content Loading-Cattle"><h2>Loading...</h2></div>
      ) : (
        renderDroneItemDetails()
      )}
    </div>
  );
};

export default DroneItem;

