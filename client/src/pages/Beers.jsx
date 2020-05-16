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
        <div className="Beers container">
          <div className="beers-header">
            <h1 className="beers-title">Search Beers</h1>
          </div>
          <div className="beers-search">
            <form className="beers-form form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-dark my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>

            <div className="beers-filter-container">
              <select
                name=""
                className="beers-filter btn btn-secondary dropdown-toggle"
              >
                <option value="" className="beers-filter-item" defaultValue>
                  Filter Beers
                </option>
                <option value="" className="beers-filter-item">
                  Filter by Type
                </option>
                <option value="" className="beers-filter-item">
                  Filter by country
                </option>
              </select>
            </div>
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
