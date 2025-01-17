import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>
        <button data-cy='complete-button' onClick={() => props.completeOrder(order.id)}>Complete Order</button>
      </div>
    )
  });

  return (
    <section data-cy='all-orders'>
      { orderEls.length ? orderEls : <p data-cy='no-orders'>No orders yet!</p> }
    </section>
  )
}

export default Orders;