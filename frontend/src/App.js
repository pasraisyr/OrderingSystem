import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Menu from './components/Menu';
import Contact from './components/Contact'
import Order from './components/Order'

function App() {
  return (
    <Routes>
    <Route
    path="/Menu" element={
      <Menu />
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
    </Routes>
  );
}

export default App;