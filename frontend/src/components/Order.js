import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Menu';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const createOrder = async () => {
    try {
      const newOrder = { customerName, menuItems };
      await axios.post('/orders', newOrder);
      fetchOrders();
      setCustomerName('');
      setMenuItems([]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const addToOrder = (menuItem) => {
    setMenuItems([...menuItems, menuItem]);
  };

  return (
    <div className="order-container">
      <h1 className="order-header">Orders</h1>
      <div className="order-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Menu addToOrder={addToOrder} />
        <button onClick={createOrder}>Create Order</button>
      </div>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <div>
              <h2>{order.customerName}</h2>
              <ul>
                {order.menuItems.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div>
              {/* <button onClick={() => updateOrder(order.id)}>Update</button>
              <button onClick={() => deleteOrder(order.id)}>Delete</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;