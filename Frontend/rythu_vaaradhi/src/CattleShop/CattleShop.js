import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../HomeNavBar/Navbar';
import BottomNavBar from '../NavbarBottom/BottomNavBar';
import './CattleShop.css';
import NavbarCattle from '../CattleShopNavbar/NavbarCattle';
import { Link } from 'react-router-dom';

// ... (previous code)

const CattleShop = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [images, setImages] = useState([]);
  const [searchInput,setSearchInput]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // 'asc' for low to high, 'desc' for high to low



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://strikeout-serverside.onrender.com/cattle-images');
        setImages(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching Cattle Shop:', error);
      }
    };

    fetchImages();

  }, []);

    const onCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const onSortChange = (value) => {
    const sortedProducts = [...images];
  
    sortedProducts.sort((a, b) => {
      const priceA = a.price || 0; // Handle undefined or null values
      const priceB = b.price || 0;
  
      if (value === 'asc') {
        return priceA - priceB;
      } else if (value === 'desc') {
        return priceB - priceA;
      }
  
      return 0; // No sorting by default
    });
  
    setImages(sortedProducts);
    setSortOrder(value);
  };
  



  const onSearch = (value) => {
   setSearchInput(value.toLowerCase())
  };

  const ImageDisplay = ({ imageId }) => {
    const imageUrl = `https://strikeout-serverside.onrender.com/cattle-images/${imageId}?index=0`;

    return (
      <div>
        {/* Show only the first image */}
        {images.length > 0 && <img src={imageUrl} alt="Cattle Post" className="Cattle-Image" />}
      </div>
    );
  };

  const renderCattleItems=()=>{

  return (
<>
<div className="Home-Content">
  <div className="Cattle-Filter-Div">
  <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="Filtering-Cattle">
            <option value="">All Categories</option>
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
  <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)} className="Filtering-Cattle">
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
  </div>
        <ul className="Cattle-Shoping-List">
          {images.filter((item) =>
      item.location.toLowerCase().includes(searchInput))
      .filter((item) => !selectedCategory || item.category === selectedCategory)
      .map((image) => (
            <li key={image._id} className="Cattle-List-Item" >
              <Link to={`/cattle_item/${image._id}`} style={{textDecoration:"none"}}>
                <ImageDisplay imageId={image._id} />
                <div className="Cattle-Post-Details">
                  <p className="Cattle-Price">Price: {image.price}</p>
                  <p className="Cattle-Item">Category: {image.category}</p>
                  <p className="Cattle-Item">Location: {image.location}</p>
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
    <NavbarCattle onSearch={onSearch}/>
    {isLoading ? (
        <div className="Home-Content Loading-Cattle"><h2>Loading...</h2></div>
        ) : (
        renderCattleItems()
      )}
    <BottomNavBar />
    </div>
  )
};





export default CattleShop;
