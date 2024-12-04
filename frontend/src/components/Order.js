import React from 'react';
import './Order.css'; // Optional: for styling

const Order = () => {
  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Order Your Meal</h1>
      </header>
      <form className="order-form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Meal:
          <select name="meal" required>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="pasta">Pasta</option>
          </select>
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;