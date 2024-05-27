import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [newUser, setNewUser] = useState({ name: '', role: '', password: '' });

  useEffect(() => {
    // Obtener productos
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    // Obtener usuarios
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    // Obtener ventas
    axios.get('http://localhost:3000/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  const handleAddProduct = () => {
    axios.post('http://localhost:3000/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:3000/products/${productId}`)
      .then(() => {
        setProducts(products.filter(p => p._id !== productId));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleAddUser = () => {
    axios.post('http://localhost:3000/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', role: '', password: '' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        setUsers(users.filter(u => u._id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administrador</h2>

      <div className="section">
        <h3>Productos</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <button type="submit">Añadir Producto</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Usuarios</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Rol"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <button type="submit">Añadir Usuario</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Ventas</h3>
        <table>
          <thead>
            <tr>
              <th>Mesero</th>
              <th>Producto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale._id}>
                <td>{sale.waiter}</td>
                <td>{sale.product}</td>
                <td>${sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
