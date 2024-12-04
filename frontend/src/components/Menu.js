import React from 'react';
import './Menu.css'; // Optional: for styling

const Menu = () => {
  const menuItems = [
    { id: 1, name: 'Pizza', price: '$10' },
    { id: 2, name: 'Burger', price: '$8' },
    { id: 3, name: 'Pasta', price: '$12' },
    { id: 4, name: 'Salad', price: '$7' },
  ];

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;