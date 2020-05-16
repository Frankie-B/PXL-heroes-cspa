import React, { Component } from 'react';
import Default from '../Layouts/Default';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Breweries.scss';

// const axios = Axios.create({
//   baseURL: ``,
//   withCredentials: true,
//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
// });

class Breweries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      select: {
        selectedCode: '',
      },
      breweries: [],
      countryCode: [],
    };
    this.getCountryCode = this.getCountryCode.bind(this);
    this.getBreweries = this.getBreweries.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getCountryCode();
    this.getBreweries();
  }

  getCountryCode() {
    axios({
      url: `http://localhost:3000/breweries/?countryIsoCode=${this.state.select.selectedCode}&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`,
    })
      .then((res) => {
        let code = [
          ...new Set(res.data.data.map((item) => item.countryIsoCode)),
        ];
        this.setState({
          countryCode: code,
        });
        console.log(this.state.countryCode.toString());
      })
      .catch((err) => {
        console.log(
          `There's no place like Home, there's no place like home: ${err}`
        );
      });
  }

  getBreweries() {
    axios({
      url: '/breweries',
    })
      .then((response) => {
        console.log('Breweries were successfully retrieved: ', response);
        this.setState({ Breweries: response.data.beers.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange(e) {
    e.preventDefault();
    let updatedCode = this.state.select;
    updatedCode[e.target.name] = e.target.value;
    this.setState({
      select: updatedCode,
    });
    this.getBreweriesList();
  }

  render() {
    let BreweriesCountry;
    !this.state.select.selectedCode
      ? (BreweriesCountry = <h2>Breweries from all countries</h2>)
      : (BreweriesCountry = (
          <h2>Breweries from {this.state.select.selectedCode}</h2>
        ));

    return (
      <Default>
        <div className="Breweries">
          <h1>Find a brewery</h1>
          <h3>Select a country from the list</h3>
          <div className="select">
            <select
              aria-label="country-code"
              name="selectedCode"
              value={this.state.select.selectedCode.toString()}
              onChange={this.handleInputChange}
            >
              <option value="" defaultValue>
                All countries
              </option>

              {this.state.countryCode.map((el) => (
                <option name="selectedCode" key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          {BreweriesCountry}
          {this.state.breweries.map((el) => (
            <div key={el.id}>
              <Link to={`breweries/brewery/${el.breweryId}`}>
                <h4>{el.brewery.name}</h4>
              </Link>
            </div>
          ))}
        </div>
      </Default>
    );
  }
}

export default Breweries;
