import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Beers.scss';

// import Suggestions from '../components/Search/Suggestions/Suggestions';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: {
        selectedCode: '',
      },
      name: '',
      type: '',
      beersByName: [],
      beersByType: [],
      beersByCountry: [],
      countryCode: [],
      page: 1,
    };
    this.getBeersByName = this.getBeersByName.bind(this);
    this.getAllBeersName = this.getAllBeersName.bind(this);
    this.getAllBeersType = this.getAllBeersType.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.handleTypeInput = this.handleTypeInput.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.getBeersByType = this.getBeersByType.bind(this);
    this.getBeersByCountry = this.getBeersByCountry.bind(this);
    this.getCountryCodes = this.getCountryCodes.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    this.getCountryCodes();
  }

  handleNameInput(e) {
    let nameInputVal = e.target.value;
    this.setState({
      name: nameInputVal.toLowerCase(),
    });
  }

  handleTypeInput(e) {
    let typeInputVal = e.target.value;
    this.setState({
      type: typeInputVal.toLowerCase(),
    });
  }

  handleCountryChange(e) {
    e.preventDefault();
    let updatedCountryCode = this.state.select;
    updatedCountryCode[e.target.name] = e.target.value;
    this.getAllCountries();
    this.setState({
      select: updatedCountryCode,
    });
    this.getAllCountries();
  }

  getAllBeersName() {
    this.getBeersByName();
  }

  getAllBeersType() {
    this.getBeersByType();
  }

  getAllCountries() {
    this.getBeersByCountry();
  }

  getBeersByName() {
    let url = '/beers';
    if (this.state.name) {
      url += '?';
      url += this.state.name;
    }
    axios({
      url: `${url}/?key=659d5c6b8f3d2447f090119e48202fdb&type=beer&q=${this.state.name}&withBreweries=Y`,
    })
      .then((response) => {
        console.log('Beers were successfully retrieved: ', response);
        this.setState({ beersByName: response.data.beers });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBeersByType() {
    axios({
      method: 'GET',
      url: `/beers/search/?key=659d5c6b8f3d2447f090119e48202fdb&p=${this.state.page}&type=beer&q=${this.state.type}`,
    })
      .then((res) => {
        this.setState({
          beersByType: res.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCountryCodes() {
    axios({
      url: `/beers/locations/?key=659d5c6b8f3d2447f090119e48202fdb`,
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
        console.log('No more beers here');
      });
  }

  getBeersByCountry() {
    axios({
      url: `/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb${this.state.page}`,
    })
      .then((res) => {
        this.setState({
          beersByCountry: res.data.beers,
        });
        this.removeDuplicates();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Default>
        <div className="Beers container">
          <div className="beers-header">
            <h1 className="beers-title">Search Beers</h1>
          </div>

          <div className="beers-search">
            <div className="beers-form-">
              <form className="beers-form form-inline my-2 my-lg-0">
                <input
                  className="form-control "
                  placeholder="Search beers by name"
                  value={this.state.name}
                  onChange={this.handleNameInput}
                />
              </form>
              <form className="beers-form form-inline my-2 my-lg-0">
                <input
                  className="form-control "
                  placeholder="Search beers by type"
                  value={this.state.type}
                  onChange={this.handleTypeInput}
                />
              </form>
              <button
                onClick={this.getAllBeersName || this.getAllBeersType}
                className="btn btn-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div>

            <div className="select">
              <select
                aria-label="country-code"
                name="selectedCode"
                value={this.state.select.selectedCode.toString()}
                onChange={this.handleCountryChange}
                onClick={this.getCountryCodes}
              >
                <option value="" defaultValue>
                  Choose a country
                </option>
                {this.state.countryCode.map((code) => (
                  <option name="selectedCode" key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="container">
              {this.state.beersByType ? (
                <div className="beers-container container">
                  {this.state.beersByType.map((type) => (
                    <div key={type.id} className="beers-link-item">
                      {type.name
                        .toLowerCase()
                        .includes(this.state.name.toLowerCase()) ? (
                        <div>
                          <Link
                            to={`/beers/${type.id}`}
                            className="beers-link-item"
                          >
                            <h5 className="beers-name">{type.name}</h5>
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

            <div className="container">
              {this.state.beersByName ? (
                <div className="beers-container container">
                  {this.state.beersByName.map((beer) => (
                    <div key={beer.id} className="beers-link-item">
                      {beer.name
                        .toLowerCase()
                        .includes(this.state.name.toLowerCase()) ? (
                        <div>
                          <Link
                            to={`/beer/${beer.id}`}
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

            <div className="container">
              {this.state.beersByCountry ? (
                <div className="beers-container container">
                  {this.state.beersByCountry.map((country) => (
                    <div key={country.id} className="beers-link-item">
                      {country.name
                        .toLowerCase()
                        .includes(this.state.name.toLowerCase()) ? (
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
              )}
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
