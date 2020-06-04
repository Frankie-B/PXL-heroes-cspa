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
    this.getBreweryBeers = this.getBreweryBeers.bind(this);
  }

  getBreweryBeers() {
    const selectedBrewery = this.props.match.params.id;
    axios
      .get(`/breweries/${selectedBrewery}/beers`)
      .then((response) => {
        console.log('all beers of this brewery: ', response.data);
        this.setState({
          beers: response.data.beers,
        });
      })
      .catch((error) => {
        console.log('Error fetching beers for brewery', error);
      });
  }

  componentDidMount() {
    this.getBreweryBeers();
  }

  getBreweryBeers() {
    const breweryBeers = this.props.match.params.id;
    axios({
      url: `/brewery/${breweryBeers}/beers/`,
    })
      .then((res) => {
        this.setState({
          beers: res.brewery.beers,
        });
        console.log(this.state.beers);
      })
      .catch((err) => {
        console.log('Error');
      });
  }

  render() {
    let Beers;
    if (this.state.beers.length === 0) {
      Beers = <h2>Loading...</h2>;
    } else if (this.state.beers.length === 1) {
      Beers = (
        <h2>
          The brewery produces <u>{this.state.beers.length}</u> beer:{' '}
        </h2>
      );
    } else {
      Beers = (
        <h2>
          The brewery produces <u>{this.state.beers.length}</u> beers:{' '}
        </h2>
      );
    }
    let brew = this.state.brewery;
    if (brew && this.state.beers) {
      return (
        <div className="single-brew-page">
          <div>
            <h1>{brew.name}</h1>
            {brew.established ? (
              <h5>
                <b>Established: {brew.established}</b>
              </h5>
            ) : (
              <p></p>
            )}
            <div className="brew-img-details">
              <div className="brew-img">
                {brew.images ? (
                  <div>
                    <a
                      href={brew.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img src={brew.images.squareMedium} alt="brewery-logo" />
                    </a>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              <a href={brew.website} rel="noopener noreferrer" target="_blank">
                <h4>{brew.website}</h4>
              </a>
              <div className="brew-description">
                <p>{brew.description}</p>
              </div>
            </div>
          </div>
          <div className="beers">
            <div className="beersCounter">{Beers}</div>
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
