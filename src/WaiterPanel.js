import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaiterPanel.css';

function WaiterPanel() {
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:3000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleAddProductToOrder = (productId) => {
    const product = products.find(p => p._id === productId);
    setOrder([...order, product]);
  };

  const handleSubmitOrder = () => {
    const newOrder = {
      table,
      products: order,
      total: order.reduce((acc, product) => acc + product.price, 0),
      status: 'Procesando'
    };

    axios.post('http://localhost:3000/orders', newOrder)
      .then(response => {
        setOrders([...orders, response.data]);
        setOrder([]);
        setTable('');
      })
      .catch(error => console.error('Error submitting order:', error));
  };

  return (
    <div className="waiter-panel">
      <h2>Panel de Mesero</h2>
      <div className="section">
        <h3>Realizar Pedido</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitOrder();
        }}>
          <div className="form-group">
            <label>Mesa:</label>
            <input 
              type="text" 
              value={table} 
              onChange={(e) => setTable(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Productos:</label>
            <select onChange={(e) => handleAddProductToOrder(e.target.value)}>
              <option value="">Seleccionar Producto</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Enviar Pedido</button>
        </form>
        <div className="current-order">
          <h4>Pedido Actual:</h4>
          <ul>
            {order.map((product, index) => (
              <li key={index}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="section">
        <h3>Pedidos</h3>
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.table}</td>
                <td>{order.products.map(p => p.name).join(', ')}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WaiterPanel;
