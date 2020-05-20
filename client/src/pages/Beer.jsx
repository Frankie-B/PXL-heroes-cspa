import React, { Component } from 'react';
import Axios from 'axios';
import Default from '../Layouts/Default';
import { Link } from 'react-router-dom';
import './Beer.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: [],
    };
    this.getBeerDetail = this.getBeerDetail.bind(this);
  }

  componentDidMount() {
    this.getBeerDetail();
  }

  getBeerDetail() {
    const beerDetail = this.props.match.params.id;
    axios({
      url: `/beers/${beerDetail}`,
    })
      .then((res) => {
        console.log('Here is the information about that beer:', res);
        this.setState({ beer: res.data.beer });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let beer = this.state.beer;
    if (beer) {
      return (
        <Default>
          <div className="Single-beer">
            <div className="single-beer-detail">
              <div className="single-beer-img">
                {beer.labels ? (
                  <img src={beer.labels.icon} alt="beer-label" />
                ) : (
                  <p></p>
                )}
              </div>
              <h1 className="single-beer-name">{beer.name}</h1>
              {beer.style ? (
                <div className="single-beer-info">
                  <p className="single-beer-style-text">
                    <b>Style: </b>
                    {beer.style.name}
                  </p>
                  <p className="single-beer-brewery">
                    <b>Brewed by:</b>&nbsp;
                    <Link
                      className="single-link-item"
                      to={`/breweries/${beer}`}
                    >
                      {beer.name} <br />
                    </Link>
                    {beer.nameDisplay}
                  </p>
                  <div className="single-beer-abv-ibu">
                    <p className="single-beer-abv">
                      <b>ABV:</b> {beer.abv}%
                    </p>
                    <p className="single-beer-ibu">
                      <b>IBU:</b> {beer.style.ibuMin} - {beer.style.ibuMax}
                    </p>
                  </div>
                </div>
              ) : (
                <h2 className="single-beer-loading">Loading...</h2>
              )}
            </div>
            <div className="single-beer-description">
              {beer.style ? <p>{beer.style.description}</p> : <p></p>}
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

export default Beer;
