import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Breweries.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

const qryStr = {
  isOrganic: false,
  trains: true,
  // plains: 'oowwyeahh',
};

const qryStrParam = Object.entries(qryStr);
console.log(qryStrParam);

const qry = qryStrParam.reduce((param, qry) => {
  const key = qry[0];
  const value = qry[1];

  if (!value) return param;

  if (param) param += `&`;
  param += `${key}=`;

  switch (typeof value) {
    case 'boolean':
      if (value) {
        param += 'Y';
      } else {
        param += 'N';
      }
      break;
    case 'string':
      param += value;
  }
  return param;
}, '');

console.log(qry);

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      breweries: [],
      breweriesByType: [],
      // countryCode: '',
      // countries: [],
      // shownBreweries: [],
      // searchType: 'name',
      // countryCode: [],
      // isOrganic: [],
    };

    this.handleOnNameChange = this.handleOnNameChange.bind(this);
    this.getAllBreweries = this.getAllBreweries.bind(this);
  }

  componentDidMount() {
    this.getAllBreweries();
  }

  handleOnNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
    this.props.handleSearch(e.target.value);
  };

  handleOnTypeChange = (e) => {
    this.setState({
      type: e.target.value,
    });
    this.props.handleSearch(e.target.value);
  };

  getAllBreweries() {
    axios({
      url: '/breweries',
    })
      .then((res) => {
        console.log(
          'Beep bop boop...Triangulation complete:',
          res.data.breweries
        );
        this.setState({ breweries: res.data.breweries });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
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
                onChange={(e) => this.handleOnChange(e)}
              />
              <button
                onClick={this.getAllBreweries}
                className="btn btn-lg  btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          {this.state.breweries ? (
            <div className="breweries-container container">
              {this.state.breweries.map((brewery) => (
                <div key={brewery.id} className="breweries-link-item">
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

          {this.state.breweries ? (
            <div className="breweries-container container">
              {this.state.breweries.map((brewery) => (
                <div key={brewery.id} className="breweries-link-item">
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
        </div>
      </Default>
    );
  }
}

export default Breweries;
