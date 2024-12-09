import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Optional: for styling

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Our Restaurant</h1>
        <p>Order your favorite meals online!</p>
        <Link to="/login" className="user-icon">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
      </header>
      <nav>
        <ul>
          <li><a href="/CustomerMenu">Menu</a></li>
          <li><a href="/order">Order Now</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;