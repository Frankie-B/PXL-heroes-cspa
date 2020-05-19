import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import _ from 'lodash';
import './Breweries.scss';
import { Link } from 'react-router-dom';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});
class Breweries extends Component {
  _isReady = false;
  constructor(props) {
    super(props);
    this.state = {
      select: {
        selectedCode: '',
      },
      breweries: [],
      countryCode: [],
    };
    this.getBreweriesList = this.getBreweriesList.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.getCountryCodeList = this.getCountryCodeList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.getCountryCodeList();
    this.getBreweriesList();
    this._isReady = true;
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
  getCountryCodeList() {
    axios({
      url: '/breweries/locations/?key=659d5c6b8f3d2447f090119e48202fdb',
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
        console.log('Error');
      });
  }
  getBreweriesList() {
    let url = '/breweries/locations/';
    if (this.state.name) {
      url += '?countryIsoCode=';
      url += this.state.select.selectedCode;
    }
    axios({
      url: `&order=breweryName&key=659d5c6b8f3d2447f090119e48202fdb`,
    })
      .then((res) => {
        this.setState({
          breweries: res.data.data,
        });
        this.removeDuplicates();
        console.log(this.state.breweries);
      })

      .catch((err) => {
        console.log('Error');
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
  handleInputChange(e) {
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.setState({
      select: updatedCountryCode,
    });
    this.getBreweriesList();
  }
  render() {
    let BreweriesCountry;
    if (!this.state.select.selectedCode) {
      BreweriesCountry = <h2>Breweries from all countries</h2>;
    } else {
      BreweriesCountry = (
        <h2>Breweries from {this.state.select.selectedCode}</h2>
      );
    }
    return (
      <Default>
        <div className="brewery-list-page">
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
              {this.state.countryCode.map((item) => (
                <option name="selectedCode" key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {BreweriesCountry}
          {this.state.breweries.map((item) => (
            <div key={item.id}>
              <Link to={`breweries/:id/${item.breweryId}`}>
                {' '}
                <h4>{item.brewery.name}</h4>
              </Link>
            </div>
          ))}
        </div>
      </Default>
    );
  }
}

export default Breweries;
