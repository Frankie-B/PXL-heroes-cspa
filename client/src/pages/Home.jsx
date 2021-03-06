import React, { Component } from 'react';
import Default from '../Layouts/Default';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <Default>
        <div className="Home ">
          <div className="home-heading-container container-fluid">
            <h1 className="home-heading">Endeavour Co.</h1>
            <h3 className="heading-tagline">Craft Beer Index</h3>
          </div>

          <div className="home-spacer"></div>
          <div className="home-welcome-text">
            <h3 className="home-subheading">Welcome to our page</h3>
            <p className="home-text">
              Feeling thirst? Why not check out our breweries and see what they
              have to offer?
            </p>
            <Link to={'/breweries'} className="home-link">
              Checkout Breweries
            </Link>
          </div>

          <div className="home-btn-container">
            <Link
              to={'/breweries'}
              className="btn btn-outline-light my-2 my-sm-0"
            >
              Breweries
            </Link>
            <Link to={'/beers'} className="btn btn-outline-light my-2 my-sm-0">
              Beers
            </Link>
          </div>
        </div>
      </Default>
    );
  }
}

export default Home;
