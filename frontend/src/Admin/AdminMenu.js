import React, { useState, useEffect, useRef } from 'react';
import './AdminMenu.css';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null); // Add a ref for the file input field

  useEffect(() => {
    fetch('http://localhost:8083/menuItems')
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, []);

  const handleAdd = () => {
    fetch('http://localhost:8083/menuItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([...menuItems, data]);
        setNewMenuItem({ name: '', description: '', price: '', imageUrl: '' });
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input field
        }
      })
      .catch((error) => console.error('Error adding menu item:', error));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewMenuItem({ name: item.name, description: item.description, price: item.price, imageUrl: item.imageUrl });
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8083/menuItems/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedMenuItems = menuItems.map((item) => (item.id === editingId ? data : item));
        setMenuItems(updatedMenuItems);
        setEditingId(null);
        setNewMenuItem({ name: '', description: '', price: '', imageUrl: '' });
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input field
        }
      })
      .catch((error) => console.error('Error editing menu item:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8083/menuItems/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting menu item:', error));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewMenuItem({ ...newMenuItem, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef} // Attach the ref to the file input field
        />
        {newMenuItem.imageUrl && <img src={newMenuItem.imageUrl} alt="Preview" className="preview-image" />}
        {editingId ? (
          <button onClick={handleSaveEdit}>Save Edit</button>
        ) : (
          <button onClick={handleAdd}>Add Menu Item</button>
        )}
      </div>

      <table className="admin-menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>{item.imageUrl && <img src={item.imageUrl} alt={item.name} className="table-image" />}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
