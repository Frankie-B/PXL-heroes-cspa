import React, { Component } from 'react';
import axios from 'axios';
import './test.css';

class TestBeers extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
    };
  }

  componentDidMount() {
    // fetch('/beers')
    //   .then((res) => res.json())
    //   .then((beers) =>
    //     this.setState({ beers }, () => console.log('beers fetched...', beers))
    //   );

    axios
      .get('https:localhost:5000/beers/?key=659d5c6b8f3d2447f090119e48202fdb')

      .then((response) => {
        console.log('all beers response: ', response);
        this.setState({ beers: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>beers</h2>

        <ul>
          {this.state.beers.map((beer) => (
            <h3 key={beer.id}>{beer.data.name}</h3>
          ))}
        </ul>
      </div>
    );
  }
}

export default TestBeers;
