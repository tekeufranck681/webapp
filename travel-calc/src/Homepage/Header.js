import React, { useState } from "react";
import "./Header.css"; // Import the CSS file
import logo from "../logo.png";
import { NavLink,Link } from "react-router-dom";

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
          <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
          <li><NavLink to="/expenses" className={({ isActive }) => (isActive ? "active" : "")}>Expenses</NavLink></li>
            <li><NavLink to="/plan-trip" className={({ isActive }) => (isActive ? "active" : "")}>PlanTrip</NavLink></li>
            <li><NavLink to="/budget" className={({ isActive }) => (isActive ? "active" : "")}>Budget</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink></li>
          </ul>

          {/* Buttons */}
          <div className="nav-buttons">
          <Link to="/signin"><button className="sign-in">Sign In</button></Link>
           <Link to="/learnmore"><button className="learn-more">Learn More</button></Link>
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
