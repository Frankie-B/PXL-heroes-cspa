import React, { Component } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">
            Endeavour Co.
          </Link>
          <div className="navbar-spacer"></div>

          <div className="collapse navbar-collapse" id="navbar-btn-container">
            <Link
              to={'/beers'}
              className="btn btn-outline-light btn-left my-2 my-sm-0"
            >
              Beers
            </Link>
            <Link
              to={'/breweries'}
              className="btn btn-outline-light btn-right my-2 my-sm-0"
            >
              Breweries
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
