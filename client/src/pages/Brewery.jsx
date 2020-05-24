import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import './Brewery.scss';
import { Link } from 'react-router-dom';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Brewery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brewery: [],
      beers: [],
    };
    this.getBrewery = this.getBrewery.bind(this);
    // this.getBreweryBeers = this.getBreweryBeers.bind(this);
  }

  componentDidMount() {
    this.getBrewery();
  }
  getBrewery() {
    // const breweryDetail = this.props.match.params.id;
    axios({
      url: `/brewery/${this.props.match.params.id}/`,
    })
      .then((res) => {
        this.setState({
          brewery: res.data.brewery,
        });
        this.getBreweryBeers();
        console.log(this.state.brewery);
      })
      .catch((err) => {
        console.log('Error');
      });
  }

  // getBreweryBeers() {
  //   const breweryBeers = this.props.match.params.id;
  //   axios({
  //     url: `/brewery/${breweryBeers}/beers/`,
  //   })
  //     .then((res) => {
  //       this.setState({
  //         beers: res.brewery.beers,
  //       });
  //       console.log(this.state.beers);
  //     })
  //     .catch((err) => {
  //       console.log('Error');
  //     });
  // }

  render() {
    let brewery = this.state.brewery;
    if (brewery) {
      return (
        <Default>
          <div className="Brewery">
            <div className="brewery-detail-detail">
              <div className="brewery-detail-img">
                {brewery.labels ? (
                  <img src={brewery.labels.icon} alt="brewery-label" />
                ) : (
                  <p></p>
                )}
              </div>
              <h1 className="brewery-detail-name">{brewery.name}</h1>
              {brewery.style ? (
                <div className="brewery-detail-info">
                  <p className="brewery-detail-style-text">
                    <b>Style: </b>
                    {brewery.style.name}
                  </p>
                  <p className="brewery-detail-brewery">
                    <b>Brewed by:</b>&nbsp;
                    <Link
                      className="single-link-item"
                      to={`/breweries/${brewery}`}
                    >
                      {brewery.name} <br />
                    </Link>
                    {brewery.nameDisplay}
                  </p>
                  <div className="brewery-detail-abv-ibu">
                    <p className="brewery-detail-abv">
                      <b>ABV:</b> {brewery.abv}%
                    </p>
                    <p className="brewery-detail-ibu">
                      <b>IBU:</b> {brewery.style.ibuMin} -{' '}
                      {brewery.style.ibuMax}
                    </p>
                  </div>
                </div>
              ) : (
                <h2 className="brewery-detail-loading">Loading...</h2>
              )}
            </div>
            <div className="brewery-detail-description">
              {brewery.style ? <p>{brewery.style.description}</p> : <p></p>}
            </div>
          </div>
        </Default>
      );
    } else {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
  }
}

export default Brewery;
