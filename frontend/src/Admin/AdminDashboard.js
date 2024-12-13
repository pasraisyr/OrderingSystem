import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="header">Admin Dashboard</h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/ViewOrder" className="nav-link">View Order</Link>
          </li>
          <li>
            <Link to="/Sales" className="nav-link">Sales</Link>
          </li>
          <li>
            <Link to="/AdminMenu" className="nav-link">Add Menu</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
