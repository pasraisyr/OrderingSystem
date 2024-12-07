import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = ({ addToOrder }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const createMenuItem = async () => {
    try {
      const newMenuItem = { name, description, price: parseFloat(price) };
      await axios.post('/menu', newMenuItem);
      fetchMenuItems();
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <div className="menu-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={createMenuItem}>Add Menu Item</button>
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => addToOrder(item)}>Add to Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;