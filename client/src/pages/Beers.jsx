import React, { Component } from 'react';
import Default from '../Layouts/Default';
import './Beers.scss';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
    };

    this.getAllBeers = this.getAllBeers.bind(this);
  }

  getAllBeers() {
    axios({
      url: '/beers',
    })
      .then((response) => {
        console.log('Beers were successfully retrieved: ', response);
        this.setState({ beers: response.data.beers.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllBeers();
    console.log(this.state);
  }

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-container">
            <div className="beers-heading-container">
              <h1 className="beers-title">Index of Beers</h1>
            </div>
            <div className="beers-container">
              {this.state.beers.map((beer) => (
                <h2 className="beers-name" key={beer.id}>
                  {beer.name}
                </h2>
              ))}
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
