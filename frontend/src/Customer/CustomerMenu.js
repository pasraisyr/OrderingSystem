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

  const filterItemsByCategory = (items, category) => {
    return items.filter(item => item.category === category);
  };

  return (
    <div className="customer-menu-container">
      <h1>Menu</h1>

      <h2>Toast</h2>
      <div className="customer-menu-list">
        {filterItemsByCategory(menuItems, 'toast').map(item => (
          <div key={item.id} className="customer-menu-item">
            <h2>{item.name}</h2>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="menu-image" />}
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <h2>Coffee</h2>
      <div className="customer-menu-list">
        {filterItemsByCategory(menuItems, 'coffee').map(item => (
          <div key={item.id} className="customer-menu-item">
            <h2>{item.name}</h2>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="menu-image" />}
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMenu;
