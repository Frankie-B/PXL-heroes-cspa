import React, { Component } from 'react';
import Default from '../Layouts/Default';
import './Beers.scss';
import Axios from 'axios';
import { Link } from 'react-router-dom';

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
      inputValue: '',
    };

    this.getAllBeers = this.getAllBeers.bind(this);
  }

  componentDidMount() {
    this.getAllBeers();
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

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="hero-title">
            <h1>Beers</h1>
          </div>
          <div className="beers-container container">
            {this.state.beers.map((beer) => (
              <Link
                key={beer.id}
                to={`/beer-info/${beer.id}`}
                className="beers-link-item"
              >
                <h2 className="beers-name">{beer.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
