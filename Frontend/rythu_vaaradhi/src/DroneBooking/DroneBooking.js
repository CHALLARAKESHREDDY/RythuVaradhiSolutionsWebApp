import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNavBar from '../NavbarBottom/BottomNavBar';
import './DroneBooking.css';
import NavbarCattle from '../CattleShopNavbar/NavbarCattle';
import { Link } from 'react-router-dom';


const DroneBooking = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [images, setImages] = useState([]);
  const [searchInput,setSearchInput]=useState([]);
  const [error,setError]=useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:402/drone-details');
        setImages(response.data);
        console.log(response.data[0])
        setIsLoading(false)
        setError(null)
      } catch (error) {
        console.error('Error fetching Drones:', error);
        setError(error); // Set error state to the error object
        setIsLoading(false);
      }
    };

    fetchImages();

  }, []);


  const onSearch = (value) => {
   setSearchInput(value.toLowerCase())
  };

  const ImageDisplay = ({ imageId }) => {
    const imageUrl = `https://strikeout-serverside.onrender.com/drone-images/${imageId}?index=0`;

    return (
      <>
        {/* Show only the first image */}
        {images.length > 0 && <img src={imageUrl} alt="Cattle Post" className="Drone-Image" />}
      </>
    );
  };

  const renderCattleItems=()=>{

  return (
<>
<div className="Home-Content">
        <ul className="Drone-List">
          {images.filter((item) =>
      item.location.toLowerCase().includes(searchInput))
      .map((image) => (
            <li key={image._id} className="Drone-List-Item" >
              <Link to={`/drone/${image._id}`} style={{textDecoration:"none",display:"flex"}}>
                <ImageDisplay imageId={image._id} />
                <div className="Cattle-Post-Details Drone-Post-Details">
                  <p className="Cattle-Price">Price: {image.price}</p>
                  <p className="Cattle-Item">Location: {image.location}</p>
                  <p className="Cattle-Item">{image.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </>
  );}


  return(
    <div className="Home-Div">
    <NavbarCattle onSearch={onSearch} />
    {isLoading ? (
      <div className="Home-Content Loading-Cattle"><h2>Loading...</h2></div>
    ) : (
      error ? (
        <div className="Home-Content Loading-Cattle"><h3>Error fetching Drones Check your Internet Connection</h3></div>
      ) : (
        renderCattleItems()
      )
    )}
    <BottomNavBar />
  </div>
  )
};





export default DroneBooking;