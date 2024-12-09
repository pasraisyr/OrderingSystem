import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import AdminMenu from './Admin/AdminMenu';
import AdminDashboard from './Admin/AdminDashboard';
import Sales from './Admin/Sales';
import ViewOrder from './Admin/ViewOrder';
import Contact from './components/Contact'
import Order from './Customer/Order'
import CustomerMenu from './Customer/CustomerMenu'
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Routes>
    <Route
    path="/AdminMenu" element={
      <AdminMenu />
    }/>

    <Route
    path="/CustomerMenu" element={
      <CustomerMenu />
    }/>
        
    <Route
    path="/" element={
      <Homepage />
    }/>

    <Route
    path="/Contact" element={
      <Contact />
    }/>

    <Route
    path="/Order" element={
      <Order />
    }/>

    <Route path="/Login" element= {<Login/>}/>
    <Route path="/Signup" element= {<Signup/>}/>
    <Route path="/AdminDashboard" element= {<AdminDashboard/>}/>
    <Route path="/ViewOrder" element= {<ViewOrder/>}/>
    <Route path="/Sales" element= {<Sales/>}/>

    
    </Routes>
    
  );
}

export default App;