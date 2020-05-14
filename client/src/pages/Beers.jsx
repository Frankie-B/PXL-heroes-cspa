import React, { Component } from 'react';
import Default from '../Layouts/Default';
import './Beers.scss';
import Axios from 'axios';
import qs from 'qs';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true, // this prevents cors errors, they also could have called it 'withCors'
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

const getAllBeers = (beer) => {
  return axios({
    method: 'GET',
    url: 'beers',
    data: qs.stringify(beer),
  })
    .then((response) => {
      console.log('all beers response: ', response);
    })
    .catch((error) => {
      console.log(error);
    });
};

class Beers extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
    };
  }

  componentDidMount() {
    getAllBeers();
  }
  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-container">
            <div className="beers-heading-container">
              <h1 className="beers-heading">Im feeling thirsty</h1>
            </div>
            <div className="beers-container">
              <h2 className="beers-name">I am thirsty</h2>
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
