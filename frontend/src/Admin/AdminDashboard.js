import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/ViewOrder">View Order</Link>
          </li>
          <li>
            <Link to="/Sales">Sales</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;