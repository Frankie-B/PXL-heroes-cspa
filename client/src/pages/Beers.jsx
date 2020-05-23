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
      name: '',
      beers: [],
    };
    this.getBeers = this.getBeers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getBeers();
  }

  handleInputChange(e) {
    let inputValue = e.target.value;
    this.setState({
      name: inputValue.toLowerCase(),
    });
  }

  getBeers() {
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

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-heading">
            <h1 className="beers-title">All Beers</h1>
          </div>

          <div className="beers-search">
            <div className="form-inline my-2 my-lg-0">
              <input
                className="form-control form-control-lg mr-sm-2"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Filter by name"
                aria-label="Search"
              />
              {/* <button
                onClick={this.beers}
                className="btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> */}
              {/* <button
                onClick={this.searchCleared}
                className="clear-search btn btn-lg btn-block d-lg-none btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Clear Filter
              </button> */}
              {/* <button
                onClick={this.beers}
                className="btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> */}
              {/* <button
                onClick={this.searchCleared}
                className="clear-search btn-desktop btn btn-lg btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Clear Filter
              </button> */}
            </div>

            {/* <div className="dropdown">
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
            </div> */}

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
            {/* {this.state.beersByCountry ? (
              <div className="beers-container container">
                {this.state.beersByCountry.map((country) => (
                  <div key={country.id} className="beers-link-item">
                    {country.breweries[0].locations[0].countryIsoCode.includes(
                      this.state.select.selectedCode
                    ) ? (
                      <div>
                        <Link
                          to={`/beers/${country.id}`}
                          className="beers-link-item"
                        >
                          <h5 className="beers-name">{country.name}</h5>
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
            )} */}
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
