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
      type: '',
      beers: [],
      beersByType: [],
      beersByCountry: [],
      countryCodes: [],
    };

    this.getAllBeers = this.getAllBeers.bind(this);
    this.getCountryCodes = this.getCountryCodes.bind(this);
    this.getBeersByCountry = this.getBeersByCountry(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    // this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    this.getAllBeers();
    this.getCountryCodes();
    this._isMounted = true;
  }

  // componentWillUnmount() {
  //   // fix Warning: Can't perform a React state update on an unmounted component / stack overflow
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }

  handleCountryChange(e) {
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.getAllBeers();
    this.setState({
      select: updatedCountryCode,
    });
    this.getAllBeers();
  }

  // handleTypeChange(e) {
  //   e.preventDefault();
  //   let locationUpdate = this.state.selectType;
  //   locationUpdate[e.target.name] = e.target.value;
  //   this.setState({
  //     beersByType: locationUpdate,
  //   });
  //   this.getAllBeers();
  // }

  getAllBeers() {
    axios({
      url: '/beers',
    })
      .then((res) => {
        console.log('Beep Bop Boop...Triangulation complete:', res.data.beers);
        this.setState({ beers: res.data.beers });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountryCodes() {
    axios({
      url: `/beers`,
    })
      .then((res) => {
        let code = [...new Set(res.beers.map((item) => item.countryIsoCode))];
        this.setState({
          countryCodes: code,
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
        console.log(res);
        this.setState({
          beersByCountry: res.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
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
                className="form-control form-control-lg mr-sm-2"
                type="search"
                placeholder="Search"
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
                onChange={this.handleCountryChange}
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
