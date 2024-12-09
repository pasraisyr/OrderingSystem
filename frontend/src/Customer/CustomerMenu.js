import React, { useState, useEffect } from 'react';
import './CustomerMenu.css';

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8083/menuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  return (
    <div className="customer-menu-container">
      <h1>Menu</h1>
      <div className="customer-menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="customer-menu-item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMenu;