import React, { Component } from 'react';
import './test.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    fetch('/beers')
      .then((res) => res.json())
      .then((customers) =>
        this.setState({ customers }, () =>
          console.log('Customers fetched...', customers)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;
