import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Breweries.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencisoCded' },
});

class Breweries extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      select: {
        countryIsoCode: '',
      },
      type: '',
      breweries: [],
      breweriesByType: [],
      breweriesByCountry: [],
      countryCodes: [],
    };

    this.getAllBreweries = this.getAllBreweries.bind(this);
    this.getCountryCodes = this.getCountryCodes.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    this.getAllBreweries();
    this.getCountryCodes();
    this._isMounted = true;
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component / stack overflow
    this.setState = (state, callback) => {
      return;
    };
  }

  handleCountryChange(e) {
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.getAllBreweries();
    this.setState({
      select: updatedCountryCode,
    });
    this.getAllBreweries();
  }

  handleTypeChange(e) {
    e.preventDefault();
    let locationUpdate = this.state.selectType;
    locationUpdate[e.target.name] = e.target.value;
    this.setState({
      breweriesByType: locationUpdate,
    });
    this.getAllBreweries();
  }

  getAllBreweries() {
    axios({
      url: '/locations',
    })
      .then((res) => {
        console.log(
          'Beep Bop Boop...Triangulation complete:',
          res.data.breweries
        );
        this.setState({ breweries: res.data.breweries });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountryCodes() {
    axios({
      url: `/locations`,
    })
      .then((res) => {
        let code = [
          ...new Set(res.data.breweries.map((item) => item.countryIsoCode)),
        ];
        this.setState({
          countryCodes: code,
        });
        console.log(this.state.countryCodes.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBreweriesByCountry() {
    axios({
      url: `/locations`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          breweriesByCountry: res.data.breweries,
        });
        //this.removeDuplicates();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // let BreweriesCountry;
    // let BreweriesType;
    // if (!this.state.selectCountry.countryIsoCode) {
    //   BreweriesCountry = <h2>Breweries from all countries</h2>;
    // } else {
    //   BreweriesCountry = (
    //     <h2>Breweries from {this.state.selectCountry.countryIsoCode}</h2>
    //   );
    // }
    // if (!this.state.selectType.locationTypeDisplay) {
    //   BreweriesType = <h2>All brewery types</h2>;
    // } else {
    //   BreweriesType = <h2> {this.state.selectType.locationTypeDisplay}s</h2>;
    // }
    return (
      <Default>
        <div className="Breweries">
          <div className="breweries-heading">
            <h1 className="breweries-title">Search our index of breweries</h1>
          </div>
          <div className="breweries-search">
            <form className="form-inline my-2 my-lg-0">
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
            </form>

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
                className="btn btn-outline-secondary"
                aria-labelledby="dropdownMenuButton"
                value={this.state.select.countryIsoCode.toString()}
                onChange={this.handleBeerCountryChange}
                onClick={this.getCountryCodes}
              >
                <option className="dropdown-item" defaultValue>
                  Filter by country
                </option>

                {this.state.countryCodes.map((country) => (
                  <option name="locationByType" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.state.breweries ? (
            <div className="breweries-container container">
              {this.state.breweries.map((brewery) => (
                <div key={brewery.id} className="breweries-link">
                  {brewery.name ? (
                    <div>
                      <Link
                        to={`/breweries/${brewery.id}`}
                        className="breweries-link-item"
                      >
                        <h5 className="breweries-name">{brewery.name}</h5>
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
              Woah! Looks like you partied a little too hard!
            </h4>
          )}

          {this.state.breweriesByCountry ? (
            <div>
              {this.state.breweriesByCountry.map((country) => (
                <div key={country.id}>
                  {country.breweries[0].locations[0].countryIsoCode.includes(
                    this.state.select.selectedCode
                  ) ? (
                    <Link to={`/beer/${country.id}`}>
                      <h5>{country.name}</h5>
                    </Link>
                  ) : (
                    <p>not exists</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h4>Nothing here, try another country</h4>
          )}
        </div>
      </Default>
    );
  }
}

export default Breweries;
