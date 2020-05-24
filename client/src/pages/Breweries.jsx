import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Breweries.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Breweries extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      select: {
        selectedCountry: '',
      },
      breweries: [],
      countryCode: [],
    };
    this.getBreweries = this.getBreweries.bind(this);
    this.getCountryCodes = this.getCountryCodes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUniqueNames = this.getUniqueNames.bind(this);
  }

  componentDidMount() {
    this.getCountryCodes();
    this.getBreweries();
    this._isMounted = true;
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component / stack overflow
    this.setState = (state, callback) => {
      return;
    };
  }

  getCountryCodes() {
    axios({
      url: '/breweries',
    })
      .then((res) => {
        let code = [
          ...new Set(res.data.breweries.map((item) => item.countryIsoCode)),
        ];
        this.setState({
          countryCode: code,
        });
        console.log(this.state.countryCode.toString());
      })
      .catch((err) => {
        console.log('Error');
      });
  }

  getBreweries() {
    axios({
      method: 'GET',
      url: `/breweries?order=breweryName&countryIsoCode=${this.state.select.selectedCountry}`,
      timeout: 1000,
    })
      .then((res) => {
        this.setState({
          breweries: res.data.breweries,
        });
        this.getUniqueNames();
        console.log(this.state.breweries);
      })
      .catch((err) => {
        console.log('Error');
      });
  }

  getUniqueNames() {
    if (this.state.breweries) {
      var unique = _.uniqBy(this.state.breweries, 'breweryId');
    }
    this.setState({
      breweries: unique,
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    let countryCodeIso = this.state.select;
    countryCodeIso[e.target.name] = e.target.value;
    this.setState({
      select: countryCodeIso,
    });
    this.getBreweries();
  }

  render() {
    let BreweriesCountry = !this.state.select.selectedCountry;

    return (
      <Default>
        <div className="Breweries">
          <div className="breweries-heading">
            <h1 className="breweries-title">Search our index of breweries</h1>
          </div>

          <div className="breweries-search">
            {/* <div className="form-inline my-2 my-lg-0">
              <input
                className="form-control form-control-lg mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={this.getAllBreweries}
                className="btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                onClick={this.getAllBreweries}
                className="btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div> */}

            <div className="dropdown">
              {/* <select
                className="btn btn-outline-secondary"
                aria-labelledby="dropdownMenuButton"
                value={this.state.breweriesByType.toString()}
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
                name="selectedCountry"
                value={this.state.select.selectedCountry.toString()}
                onChange={this.handleInputChange}
              >
                <option className="dropdown-item" defaultValue>
                  Filter by country
                </option>

                {this.state.countryCode.map((country) => (
                  <option name="selectedCountry" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {BreweriesCountry ? (
            <h2>Breweries from all countries</h2>
          ) : (
            <h2>Breweries from {this.state.select.selectedCountry}</h2>
          )}

          {this.state.breweries ? (
            <div className="breweries-container container">
              <div className="breweries-countries">{BreweriesCountry}</div>
              {this.state.breweries.map((brewery) => (
                <div key={brewery.id} className="breweries-link">
                  {brewery.name ? (
                    <div>
                      <Link
                        to={`/breweries/${brewery.id}`}
                        className="breweries-link-item"
                      >
                        <h5 className="breweries-name">
                          {brewery.brewery.name}
                        </h5>
                      </Link>
                    </div>
                  ) : (
                    <p className="breweries-not-found">
                      That beer does not exists
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h4 className="breweries-error">
              Looks like you partied a little too hard!That brewery does not
              exist.
            </h4>
          )}
        </div>
      </Default>
    );
  }
}

export default Breweries;
