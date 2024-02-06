import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './CattleItem.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageDisplay = ({ imageId }) => {
  const imageUrl0 = `http://localhost:402/images/${imageId}?index=0`;
  const imageUrl1 = `http://localhost:402/images/${imageId}?index=1`;
  const imageUrl2 = `http://localhost:402/images/${imageId}?index=2`;

 
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
    <div className="slider-container">
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

const CattleItem = () => {
  const [cattleData, setCattleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getCattleItemData = async () => {
      try {
        const response = await fetch(`http://localhost:402/Cattle_Images/${id}`);
        const data = await response.json();
        setCattleData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Cattle data:', error);
        setIsLoading(false);
      }
    };

    getCattleItemData();
  }, [id]);

  const renderCattleItemDetails = () => {
    const { category, price, description, location,farmer} =cattleData;
    console.log(farmer.fullName)

    return (
      <div className="blog-info">
        <ImageDisplay imageId={id} />
        <div className="Cattle-Details">
          <h3 className="Cattle-Details-Head">Cattle Details</h3>
          <h3 className="blog-details-title">Price : {price}</h3>
        <h3 className="blog-details-title">Category : {category}</h3>
        <h3 className="blog-details-title">Description: {description}</h3>

        </div>
        <div className="Cattle-Details">
          <h3 className="Cattle-Details-Head">Owner Details</h3>
        <h3 className="blog-details-title">Name : {farmer.fullName}</h3>
        <h3 className="blog-details-title">Phone : { farmer.phoneNumber}</h3>
        <h3 className="blog-details-title">Location : { location}</h3>

        </div>
      </div>
    );
  };

  return (
    <div className="blog-container">
      {isLoading ? (
      <div className="Home-Content Loading-Cattle"><h2>Loading...</h2></div>
      ) : (
        renderCattleItemDetails()
      )}
    </div>
  );
};

export default CattleItem;
