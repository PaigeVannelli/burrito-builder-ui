import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    }
  }
  
  getAllBurritos = () => {
    getOrders()
      .then(orders => this.setState({ orders: orders.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  componentDidMount() {
    this.getAllBurritos()
  }

  addOrder = (newOrder) => {
    postOrder(newOrder)
    .then(() => this.getAllBurritos())
    .catch(err => console.error('Error posting:', err));
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
