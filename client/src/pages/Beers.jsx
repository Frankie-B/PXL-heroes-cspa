import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Beers.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      select: {
        countryIsoCode: '',
      },
      name: '',
      beers: [],
      // beersByType: [],
      beersByCountry: [],
      countryCode: [],
    };

    this.getAllBeers = this.getAllBeers.bind(this);
    this.getCountryCode = this.getCountryCode.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBeerCountryChange = this.handleBeerCountryChange.bind(this);
    // this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    this.getAllBeers();
    this.getCountryCode();
    this._isMounted = true;
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component / stack overflow
    this.setState = (state, callback) => {
      return;
    };
  }

  handleInputChange(e) {
    let input = e.target.value;
    this.setState({
      name: input.toLowerCase(),
    });
  }

  handleBeerCountryChange(e) {
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.getCountries();
    this.setState({
      select: updatedCountryCode,
    });
    this.getCountries();
  }

  getAllBeers() {
    axios({
      url: `/beers`,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          beers: response.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountryCode() {
    axios({
      url: `/locations`,
    })
      .then((response) => {
        let code = [
          ...new Set(response.data.beers.map((item) => item.countryIsoCode)),
        ];
        this.setState({
          countryCode: code,
        });
        console.log(this.state.countryCode.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountries() {
    axios({
      url: `/beers`,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          beersByCountry: response.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeDuplicates() {
    if (this.state.breweries) {
      var unique = _.uniqBy(this.state.breweries, 'breweryId');
    }
    this.setState({
      breweries: unique,
    });
  }

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-heading">
            <h1 className="beers-title">Here's a list of our beers</h1>
          </div>
          <div className="beers-search">
            <form className="form-inline my-2 my-lg-0">
              <input
                onChange={this.handleInputChange}
                value={this.state.name}
                name="name"
                className="form-control form-control-lg mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button
                onClick={this.getAllBeers}
                className="btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                onClick={this.getAllBeers}
                className="btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>

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
                value={this.state.select.countryIsoCode.toString()}
                onChange={this.handleBeerCountryChange}
                onClick={this.getCountryCode}
              >
                <option className="dropdown-item" defaultValue>
                  Filter by country
                </option>

                {this.state.countryCode.map((country) => (
                  <option name="locationByType" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.state.beers ? (
            <div className="beers-container container">
              {this.state.beers.map((beer) => (
                <div key={beer.id} className="beers-link-item">
                  {beer.name ? (
                    <div>
                      <Link
                        to={`/beers/${beer.id}`}
                        className="beers-link-item"
                      >
                        <h5 className="beers-name">{beer.name}</h5>
                      </Link>
                    </div>
                  ) : (
                    <p className="beers-not-found">That beer does not exists</p>
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
        {this.state.beersByCountry ? (
          <div className="beers-container container">
            {this.state.beersByCountry.map((country) => (
              <div key={country.id} className="beers-link-item">
                {country.breweries[0].locations[0].countryIsoCode.includes(
                  this.state.select.selectedCode
                ) ? (
                  <div>
                    <Link
                      to={`/beer/${country.id}`}
                      className="beers-link-item"
                    >
                      <h5 className="beers-name">{country.name}</h5>
                    </Link>
                  </div>
                ) : (
                  <p className="beers-not-found">That beer does not exists</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h4 className="beers-error">
            Whoops the fridge is empty, try another name
          </h4>
        )}
      </Default>
    );
  }
}

export default Beers;
