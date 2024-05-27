import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';
import AdminPanel from './AdminPanel';
import KitchenPanel from './KitchenPanel';
import WaiterPanel from './WaiterPanel';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleButtonClick = (role) => {
    setRole(role);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRole('');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowModal(false);
  };

  if (isAuthenticated) {
    if (role === 'Administrador') {
      return <AdminPanel />;
    } else if (role === 'Cocina') {
      return <KitchenPanel />;
    } else if (role === 'Mesero') {
      return <WaiterPanel />;
    }
  }

  return (
    <div className="container">
      <h1>FenixFood</h1>
      <div className="button-container">
        <button className="button admin" onClick={() => handleButtonClick('Administrador')}>Administrador</button>
        <button className="button kitchen" onClick={() => handleButtonClick('Cocina')}>Cocina</button>
        <button className="button waiter" onClick={() => handleButtonClick('Mesero')}>Mesero</button>
      </div>
      {showModal && <Modal role={role} closeModal={closeModal} handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
