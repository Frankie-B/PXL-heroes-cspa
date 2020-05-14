import React, { Component } from 'react';
import Default from '../Layouts/Default';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  // handleClick =

  render() {
    return (
      <Default>
        <div className="Home">
          <div className="home-heading-container">
            <h1 className="home-heading">Endeavour Co.</h1>
            <h3 className="heading-tagline">Craft Beer Index</h3>
          </div>

          <div className="home-spacer"></div>

          <div className="home-btn-container">
            <Link to={'/beers'} className="btn btn-outline-light my-2 my-sm-0">
              Beers
            </Link>
            <Link
              href={'/breweries'}
              className="btn btn-outline-light my-2 my-sm-0"
            >
              Breweries
            </Link>
          </div>
        </div>
      </Default>
    );
  }
}

export default Home;
