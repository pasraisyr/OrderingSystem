import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order is placed

  useEffect(() => {
    fetch('http://localhost:8083/menuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const addToOrder = (menuItem) => {
    const existingItem = selectedItems.find(item => item.id === menuItem.id);
    if (existingItem) {
      const updatedItems = selectedItems.map(item =>
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setSelectedItems(updatedItems);
      setTotalPrice(prevPrice => prevPrice + menuItem.price);
    } else {
      setSelectedItems([...selectedItems, { ...menuItem, quantity: 1 }]);
      setTotalPrice(prevPrice => prevPrice + menuItem.price);
    }
  };

  const removeFromOrder = (menuItem) => {
    const existingItem = selectedItems.find(item => item.id === menuItem.id);
    if (existingItem.quantity > 1) {
      const updatedItems = selectedItems.map(item =>
        item.id === menuItem.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setSelectedItems(updatedItems);
      setTotalPrice(prevPrice => prevPrice - menuItem.price);
    } else {
      setSelectedItems(selectedItems.filter(item => item.id !== menuItem.id));
      setTotalPrice(prevPrice => prevPrice - menuItem.price);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderDetails = {
      customerName,
      menuItems: selectedItems,
      totalPrice,
    };
    try {
      await axios.post('http://localhost:8083/orders', orderDetails);
      setOrderPlaced(true); // Set orderPlaced to true after placing the order
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-details-container">
        <h1>Order Details</h1>
        <p>Customer Name: {customerName}</p>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1 className="order-header">New Order</h1>
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
              <button type="button" onClick={() => addToOrder(item)}>Add to Order</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                <button type="button" onClick={() => addToOrder(item)}>+</button>
                <button type="button" onClick={() => removeFromOrder(item)}>-</button>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;