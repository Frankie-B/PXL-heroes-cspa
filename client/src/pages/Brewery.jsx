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
        console.log(`${this.props.match.params.id}`);
        console.log(res.data.brewery);
        this.setState({
          brewery: res.data.brew,
        });
        // this.getBreweryBeers();
        console.log(this.state.brewery);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO
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
    let breweryBeers = this.state.beers;
    let brewery = this.state.brewery;
    if (brewery) {
      return (
        <Default>
          <div className="single-brewery-page">
            <div>
              <h1>{brewery.name}</h1>
              {brewery.established ? (
                <h5>
                  <b>Established: {brewery.established}</b>
                </h5>
              ) : (
                <p></p>
              )}
              <div className="brewery-img-details">
                <div className="brewery-img">
                  {brewery.images ? (
                    <div>
                      <a
                        href={brewery.website}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img
                          src={brewery.images.squareMedium}
                          alt="brewery-logo"
                        />
                      </a>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
                <a
                  href={brewery.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <h4>{brewery.website}</h4>
                </a>
                <div className="brewery-description">
                  <p>{brewery.description}</p>
                </div>
              </div>
            </div>
            <div className="beers">
              <div className="beersCounter">{breweryBeers}</div>
              <div className="beers-box">
                {this.state.beers.map((item) => (
                  <div key={item.id}>
                    <Link to={`/beer/${item.id}`}>
                      {' '}
                      <h5>{item.name}</h5>
                    </Link>
                  </div>
                ))}
              </div>
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
