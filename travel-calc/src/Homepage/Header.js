import React, { useState } from "react";
import "./Header.css"; // Import the CSS file
import logo from "../logo.png";

import {FaSearch} from "react-icons/fa";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo" ></img>
          <span>Travel-Calc</span></div>

        {/* Search Bar */}
        <div className="search-bar">
          <span><input type="text" placeholder="Search" />
       <FaSearch style={{color: '#aaa'}} /></span>
          
          
        </div>

        {/* Navbar Links */}
        <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          {/* Buttons */}
          <div className="nav-buttons">
            <button className="sign-in">Sign In</button>
            <button className="learn-more">Learn More</button>
          </div>
        </nav>

        {/* Hamburger Menu */}
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
