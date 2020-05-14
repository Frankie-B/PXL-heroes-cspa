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
      inputValue: '',
    };

    this.getAllBeers = this.getAllBeers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.SearchByName = this.SearchByName.bind(this);
    //this.handleSearchType = this.handleSearchType.bind(this);
    this.handleClick = this.handleClick(this);
  }

  componentDidMount() {
    this.getAllBeers();
    console.log(this.state);
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
          <div className="beers-container">
            <div className="beers-heading-container">
              <h1 className="beers-title">Index of Beers</h1>
            </div>
            <div className="beers-search">
              <form
                onSubmit={this.getAllBeers}
                class="form-inline my-2 my-lg-0"
              >
                <input
                  // onChange={}
                  class="beers-search-bar form-control mr-sm-2"
                  type="search"
                  placeholder="Search Beers..."
                  aria-label="Search"
                />

                <button
                  class="beers-search-btn btn btn-outline-light my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
                <select
                  name="search"
                  // onChange={}
                  class="dropdown beers-search-btn btn btn-outline-light my-2 my-sm-0"
                >
                  <option className="dropdown-item" value="all" selected>
                    Filter
                  </option>
                  <option className="dropdown-item" value="name">
                    By Name
                  </option>
                  <option className="dropdown-item" value="distance">
                    By Type
                  </option>
                </select>
              </form>
            </div>
            <div className="beers-container">
              {this.state.beers.map((beer, index) => {
                return (
                  <div
                    className="beers-name"
                    key={index}
                    beer={beer.name}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
