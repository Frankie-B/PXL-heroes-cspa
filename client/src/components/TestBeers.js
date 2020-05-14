import React, { Component } from 'react';
// import axios from 'axios';
import './test.css';

import { getAllBeers } from '../utils/auth';

class TestBeers extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      name: '',
      page: 1,
    };
  }

  componentDidMount() {
    // fetch('/beers')
    //   .then((res) => res.json())
    //   .then((beers) =>
    //     this.setState({ beers }, () => console.log('beers fetched...', beers))
    //   );
    // Beers.get('http://localhost:5000/beers')
    //   .then((response) => {
    //     console.log('all beers response: ', response);
    //     this.setState({ beers: response.data.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    getAllBeers();
  }

  render() {
    return (
      <div>
        <h2>beers</h2>

        <ul>
          {this.state.beers.map((beer) => (
            <h3 key={beer.id}>{beer.name}</h3>
          ))}
        </ul>
      </div>
    );
  }
}

export default TestBeers;
