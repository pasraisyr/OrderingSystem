import React, { useState, useEffect } from 'react';
import './ViewOrder.css';

const ViewOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch the next order number from the backend
    fetch('http://localhost:8083/orders/next-order-number')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched order number:', data);
        if (data?.orderNumber) setOrderNumber(data.orderNumber);
        else console.error('Invalid order number format from backend');
      })
      .catch((error) => console.error('Error fetching order number:', error));

    // Fetch all orders
    fetch('http://localhost:8083/orders')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched orders:', data);
        setOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));

    // Fetch menu items
    fetch('http://localhost:8083/menuItems')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched menu items:', data);
        setMenuItems(data);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const calculateTotalPrice = (menuItems) => {
    return menuItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Menu Item</th>
            <th>Price</th>
            <th>Customer Name</th>
            <th>Order Type</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && console.log('Orders:', orders)}
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderNumber}</td>
              <td>
                {order.menuItems.map((menuItem, idx) => (
                  <div key={idx}>{menuItem.name}</div>
                ))}
              </td>
              <td>
                {order.menuItems.map((menuItem, idx) => (
                  <div key={idx}>${menuItem.price.toFixed(2)}</div>
                ))}
              </td>
              <td>{order.customerName}</td>
              <td>{order.orderType}</td>
              <td>${calculateTotalPrice(order.menuItems)}</td>
              <td>
                <button>Done</button>
                <button>Not Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.location.href = 'http://localhost:3000/'}>Back to Home</button>
    </div>
  );
};

export default ViewOrder;
