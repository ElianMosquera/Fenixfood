import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KitchenPanel.css';

function KitchenPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtener los pedidos desde el servidor cuando el componente se monta
    axios.get('http://localhost:3000/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleUpdateOrderStatus = (orderId, status) => {
    // Actualizar el estado del pedido en el servidor y en el estado local
    axios.put(`http://localhost:3000/orders/${orderId}`, { status })
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? response.data : order));
      })
      .catch(error => {
        console.error('Error updating order status:', error);
      });
  };

  return (
    <div className="kitchen-panel">
      <h2>Panel de Cocina</h2>
      <div>
        <h3>Pedidos</h3>
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.table}</td>
                <td>{order.products.join(', ')}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === 'Procesando' && (
                    <button onClick={() => handleUpdateOrderStatus(order._id, 'Listo')}>Marcar como Listo</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KitchenPanel;
