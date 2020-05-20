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

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // select: {
      //   selectedCode: '',
      // },
      breweries: [],
      // countries: [],
      // shownBreweries: [],
      // searchType: 'name',
      // countryCode: [],
      // isOrganic: [],
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
    // this.getBeersByType = this.getBeersByType.bind(this);
    // this.handleTypeInput = this.handleTypeInput.bind(this);
    // this.handleNameInput = this.handleNameInput.bind(this);
    // this.getCountryCodes = this.getCountryCodes.bind(this);
    // this.getBeersByCountry = this.getBeersByCountry.bind(this);
    // this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount() {
    this.getAllBreweries();
  }

  // handleNameInput(e) {
  //   let nameInputVal = e.target.value;
  //   this.setState({
  //     name: nameInputVal.toLowerCase(),
  //   });
  // }

  // handleTypeInput(e) {
  //   let typeInputVal = e.target.value;
  //   this.setState({
  //     type: typeInputVal.toLowerCase(),
  //   });
  // }

  // handleCountryChange(e) {
  //   e.preventDefault();
  //   let updatedCountryCode = this.state.select;
  //   updatedCountryCode[e.target.name] = e.target.value;
  //   this.getBeersByCountry();
  //   this.setState({
  //     select: updatedCountryCode,
  //   });
  //   this.getBeersByCountry();
  // }

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

  // getBeersByType() {
  //   axios({
  //     url: `/beers/?key=659d5c6b8f3d2447f090119e48202fdb&type=beer&q=${this.state.type}`,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         beersByType: res.data.beers,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // getCountryCodes() {
  //   axios({
  //     url: `/breweries`,
  //   })
  //     .then((res) => {
  //       let code = [
  //         ...new Set(res.data.beers.map((item) => item.countryIsoCode)),
  //       ];
  //       this.setState({
  //         countryCode: code,
  //       });
  //       console.log(this.state.countryCode.toString());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // getBeersByCountry() {
  //   axios({
  //     url: `/beers/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`,
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         beersByCountry: res.data.beers,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <Default>
        <div className="Breweries">
          <div className="breweries-heading">
            <h1 className="breweries-title">Search our index of breweries</h1>
          </div>
          <div className="breweries-search">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control form-control-lg mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-lg  btn-outline-light my-2 my-sm-0"
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
        </div>
      </Default>
    );
  }
}

export default Breweries;
