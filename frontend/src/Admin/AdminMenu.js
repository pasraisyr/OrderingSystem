import React, { useState, useEffect } from 'react';
import './AdminMenu.css';


const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8083/menuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleAdd = () => {
    fetch('http://localhost:8083/menuItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New menu item added:', data);
        setMenuItems([...menuItems, data]);
        setNewMenuItem({ name: '', description: '', price: '' });
      })
      .catch(error => console.error('Error adding menu item:', error));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewMenuItem({ name: item.name, description: item.description, price: item.price });
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8083/menuItems/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem),
    })
      .then(response => response.json())
      .then(data => {
        const updatedMenuItems = menuItems.map(item => item.id === editingId ? data : item);
        setMenuItems(updatedMenuItems);
        setEditingId(null);
        setNewMenuItem({ name: '', description: '', price: '' });
      })
      .catch(error => console.error('Error editing menu item:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8083/menuItems/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMenuItems(menuItems.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting menu item:', error));
  };

  return (
    <div className="admin-menu-container">
      <h1>Admin Menu</h1>
      <div className="admin-menu-form">
        <input
          type="text"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
        />
        {editingId ? (
          <button onClick={handleSaveEdit}>Save Edit</button>
        ) : (
          <button onClick={handleAdd}>Add Menu Item</button>
        )}
      </div>
      <div className="admin-menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="admin-menu-item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;