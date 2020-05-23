import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Beers.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        selectedCountry: '',
      },
      name: '',
      beers: [],
      beersByCountry: [],
      countryCodes: [],
    };
    this.getAllBeers = this.getAllBeers.bind(this);
    this.getBeersByCountry = this.getBeersByCountry.bind(this);
    this.getCountryCodes = this.getCountryCodes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.searchCleared = this.searchCleared.bind(this);
  }

  componentDidMount() {
    // this.getAllBeers();
    this.getCountryCodes();
  }

  handleInputChange(e) {
    let inputValue = e.target.value;
    this.setState({
      name: inputValue.toLowerCase(),
    });
  }

  handleCountryChange(e) {
    e.preventDefault();
    let countryUpdate = this.state.option;
    countryUpdate[e.target.name] = e.target.value;
    this.getBeersByCountry();
    this.setState({
      option: countryUpdate,
    });
    this.getBeersByCountry();
  }

  getAllBeers() {
    axios({
      url: `/beers`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          beers: res.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountryCodes() {
    axios({
      url: '/beers',
    })
      .then((res) => {
        let isCode = [...new Set(res.beers.map((code) => code.countryIsoCode))];
        this.setState({
          countryCodes: isCode,
        });
        console.log(this.state.countryCodes.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBeersByCountry() {
    axios({
      url: `/beers`,
    })
      .then((res) => {
        this.setState({
          beersByCountry: res.beers,
        });
        // console.log(this.state.page);
        // this.removeDuplicates();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchCleared() {
    this.setState({
      option: {
        selectedCountry: '',
      },
      name: '',
      beers: [],
      beersByCountry: [],
      countryCodes: [],
    });
  }

  // removeDuplicates() {
  //   if (this.state.breweries) {
  //     var unique = _.uniqBy(this.state.breweries, 'breweryId');
  //   }
  //   this.setState({
  //     breweries: unique,
  //   });
  // }

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-heading">
            <h1 className="beers-title">Search Beers by Name</h1>
          </div>

          <div className="beers-search">
            <div className="form-inline my-2 my-lg-0">
              <input
                className="form-control form-control-lg mr-sm-2"
                type="text"
                name="name"
                defaultValue="Reset"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Search Beers"
                aria-label="Search"
              />
              <button
                onClick={this.getAllBeers}
                className="btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                onClick={this.searchCleared}
                className="clear-search btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Clear Search
              </button>
              <button
                onClick={this.getAllBeers}
                className="btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                onClick={this.searchCleared}
                className="clear-search btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Clear Search
              </button>
            </div>

            <div className="dropdown">
              {/* <select
                className="btn btn-outline-secondary"
                aria-labelledby="dropdownMenuButton"
                value={this.state.beersByType.toString()}
                onClick={(e) => this.handleTypeChange(e)}
              >
                <option className="dropdown-item" defaultValue>
                  Fiter by type
                </option>

                {this.state.locationType.map((type) => (
                  <option name="locationType" key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select> */}

              <select
                className="btn btn-outline-secondary"
                aria-labelledby="dropdownMenuButton"
                value={this.state.option.selectedCountry.toString()}
                onChange={this.handleCountryChange}
                onClick={this.getCountryCodes}
              >
                <option className="dropdown-item" defaultValue>
                  Filter by country
                </option>

                {this.state.countryCodes.map((country) => (
                  <option name="selectedCountry" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {this.state.beers ? (
              <div className="beers-container container">
                {this.state.beers.map((beer) => (
                  <div key={beer.id} className="beers-link-item">
                    {beer.name
                      .toLowerCase()
                      .includes(this.state.name.toLowerCase()) ? (
                      <div>
                        <Link
                          to={`/beers/${beer.id}`}
                          className="beers-link-item"
                        >
                          <h5 className="beers-name">{beer.name}</h5>
                        </Link>
                      </div>
                    ) : (
                      <p className="beers-not-found">
                        That beer does not exists
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="beers-error">
                Whoops the fridge is empty, try another name
              </h4>
            )}
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
