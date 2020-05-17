import React, { Component } from 'react';
import axios from 'axios';

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: [],
    };
  }

  componentDidMount() {
    const selectedBeer = this.props.match.params.id;

    axios
      .get(`http://localhost:5000/beers/${selectedBeer}`)
      .then((response) => {
        console.log('one beer response: ', response);
        this.setState({ beer: response.data.beers });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('here', this.state.beer.style);

    return (
      <div>
        {!this.state.beer && <h1>Loading...</h1>}
        {this.state.beer && (
          <div>
            <h2>{this.state.beer.name}</h2>
            <p>{this.state.beer.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Beer;
