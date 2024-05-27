import React from 'react';
import './Modal.css';

function Modal({ role, closeModal, handleLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{role} - Iniciar Sesión / Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-actions">
            <button type="submit">Iniciar Sesión</button>
            <button type="button">Registrarse</button>
          </div>
        </form>
        <button className="close-button" onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
