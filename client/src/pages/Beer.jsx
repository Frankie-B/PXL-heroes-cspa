import React, { Component } from 'react';
import Axios from 'axios';
import Default from '../Layouts/Default';
import { Link } from 'react-router-dom';
import './Beer.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: [],
    };
    this.getSingleBeer = this.getSingleBeer.bind(this);
  }

  componentDidMount() {
    this.getSingleBeer();
  }

  getSingleBeer() {
    let url = '/beer';
    if (this.state.query) {
      url += '?';
      url += this.state.query;
    }
    axios({
      url: `${url}/${this.props.match.params.id}/?withBreweries=Y&key=659d5c6b8f3d2447f090119e48202fdb`,
    })
      .then((res) => {
        this.setState({
          beer: res.data,
        });
        console.log(this.state.beer);
      })
      .catch((err) => {
        console.log(`Aww snap! something went wrong: ${err}`);
      });
  }

  render() {
    let beer = this.state.beer;
    if (beer) {
      return (
        <Default>
          <div className="Single-beer">
            <div className="single-beer-details">
              <h1 className="single-beer-name">{beer.name}</h1>
              {beer.style ? (
                <div>
                  <p>
                    <b>Style: </b>
                    {beer.style.name}
                  </p>
                  <p>
                    <b>Brewed by:</b>&nbsp;
                    <Link to={`/breweries/brewery/${beer.breweries[0].id}`}>
                      {beer.breweries[0].name}
                    </Link>{' '}
                    in {beer.breweries[0].locations[0].country.displayName}
                  </p>
                  <div className="abv-ibu">
                    <p>
                      <b>ABV:</b> {beer.abv}%
                    </p>
                    <p>
                      <b>IBU:</b> {beer.style.ibuMin} - {beer.style.ibuMax}
                    </p>
                  </div>
                </div>
              ) : (
                <h2>Loading...</h2>
              )}
              <div className="beer-img">
                {beer.labels ? (
                  <img src={beer.labels.medium} alt="beer-label" />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className="beer-description">
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
