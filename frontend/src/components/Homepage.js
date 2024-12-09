import React from 'react';
import './Homepage.css'; // Optional: for styling

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Our Restaurant</h1>
        <p>Order your favorite meals online!</p>
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