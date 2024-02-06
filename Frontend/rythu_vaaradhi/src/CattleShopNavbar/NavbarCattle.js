import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

import './NavbarCattle.css';

const NavbarCattle = ({ onSearch, onFilter, onSort }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);
    onSearch(value);
  };
  

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

 

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilter(selectedCategory);
  };

  const handleSortSubmit = (e) => {
    e.preventDefault();
    onSort(sortOrder);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img
            src="https://i.postimg.cc/jjjXG5Nd/Farm-Logo-Transparent.png"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="MenuBar-Cattle">
          {/* Search by Location */}
          <form style={{width:"100%"}}>

            <input
              type="text"
              placeholder="search by location"
              value={searchLocation}
              onChange={handleSearchChange}
              className="SearchInput"
            />
          </form>

          
        </div>
      </div>
    </nav>
  );
};

export default NavbarCattle;

