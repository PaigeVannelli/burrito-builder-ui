import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handleIngredientChange = e => {
    e.preventDefault()
    let tempIngredients = this.state.ingredients
    const numberOfIngredients = tempIngredients.reduce((count, ingredient) => {
      if (ingredient === e.target.name) {
        count++
      }
      return count
    }, 0)
    if (numberOfIngredients < 2) {
      tempIngredients.push(e.target.name)
    }
    this.setState({ ingredients: tempIngredients })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted")
    let newOrder = {
      key: Date.now(),
      ...this.state,
    }
    this.props.addOrder(newOrder)
    this.clearInputs();
  }

  validateOrder = e => {
    if (this.state.name & this.state.ingredients) {
      return true
    } else {
     return false 
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button data-cy='ingredients-button' key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form data-cy='order-form'>
        <input
          data-cy='name-input'
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p data-cy='order-details'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button data-cy='submit-order' disabled={!this.state.ingredients.length || !this.state.name} onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
