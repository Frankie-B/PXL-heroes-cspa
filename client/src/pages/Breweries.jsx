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

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries: [],
    };
    this.getBreweries = this.getBreweries.bind(this);
  }

  componentDidMount() {
    this.getBreweries();
  }

  getBreweries() {
    axios({
      url: `/breweries`,
    })
      .then((res) => {
        this.setState({
          breweries: res.data.breweries,
        });
        console.log(this.state.breweries);
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
            <h1 className="breweries-title">Index of our breweries</h1>
          </div>

          {this.state.breweries ? (
            <div className="breweries-container container">
              {this.state.breweries.map((brewery) => (
                <div key={brewery.id} className="breweries-link">
                  {brewery.name ? (
                    <div>
                      <Link
                        to={`/breweries/brewery/${brewery.id}`}
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
              Looks like you partied a little too hard!That brewery does not
              exist.
            </h4>
          )}
        </div>
      </Default>
    );
  }
}

export default Breweries;
