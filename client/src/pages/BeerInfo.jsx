import React, { Component } from 'react';
import './BeerInfo.scss';

import axios from 'axios';

class BeerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    const matchedBeer = this.props.match.params.id;
    axios
      .get(
        `https://sandbox-api.brewerydb.com/v2/beer/${matchedBeer}/?key=659d5c6b8f3d2447f090119e48202fdb`
      )
      .then((response) => {
        const RESPONSE = response.data.data;
        console.log('Heres that beer your ordered: ', RESPONSE);
        this.setState({ beer: RESPONSE });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {!this.state.beer && <h1>Loading...</h1>}
        {this.state.beer && (
          <div>
            <h2>{this.state.beer.name}</h2>
            {!this.state.beer.description && <div></div>}
            {this.state.beer.description && (
              <p>Description: {this.state.beer.description}</p>
            )}
            {!this.state.beer.foodPairings && <div></div>}
            {this.state.beer.foodPairings && (
              <p>foodPairings: {this.state.beer.foodPairings}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BeerInfo;
