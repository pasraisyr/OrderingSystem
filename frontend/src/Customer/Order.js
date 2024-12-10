import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState(''); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    fetch('http://localhost:8083/menuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));

    // Fetch the next order number from the backend
    fetch('http://localhost:8083/orders/next-order-number')
      .then((response) => response.json())
      .then((data) => {
        if (data?.orderNumber) setOrderNumber(data.orderNumber);
        else console.error('Invalid order number format from backend');
      })
      .catch((error) => console.error('Error fetching order number:', error));
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
      orderType,
      menuItems: selectedItems,
      totalPrice,
    };
    try {
      const response = await axios.post('http://localhost:8083/orders', orderDetails);
      setOrderNumber(response.data.orderNumber); // Get the generated order number
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-details-container">
        <div className="order-details-box">
          <h1>Order Details</h1>
          <p><strong>Order Number:</strong> {orderNumber}</p>
          <p><strong>Customer Name:</strong> {customerName}</p>
          <p><strong>Order Type:</strong> {orderType}</p>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          <button onClick={() => window.location.href = 'http://localhost:3000/'}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1 className="order-header">
        New Order
        {orderNumber && <span className="order-number"> - Order Number: {orderNumber}</span>}
      </h1>
      
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <div className="order-type-container">
          <label htmlFor="orderType">Order Type:</label>
          <select
            id="orderType"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            required
          >
            <option value="Dine In">Dine In</option>
            <option value="Take Away">Take Away</option>
          </select>
        </div>
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <h2>{item.name}</h2>
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="menu-image" />}
              <div className="menu-item-details">
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
                <button
                  type="button"
                  className="add-order-button"
                  onClick={() => addToOrder(item)}
                >
                  Add Order
                </button>
              </div>
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
      <button onClick={() => window.location.href = 'http://localhost:3000/'}>Back to Home</button>
    </div>
  );
};

export default Order;
