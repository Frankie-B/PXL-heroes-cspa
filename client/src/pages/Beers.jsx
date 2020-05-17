import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Beers.scss';

// import Suggestions from '../components/Search/Suggestions/Suggestions';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      query: '',
      beers: [],
    };
    this.getBeersInfo = this.getBeersInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.getBeersInfo();
  }

  getBeersInfo() {
    axios({
      url: '/beers',
    })
      .then((response) => {
        console.log('Beers were successfully retrieved: ', response);
        this.setState({ beers: response.data.beers.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange() {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getBeersInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  }

  render() {
    return (
      <Default>
        <div className="Beers container">
          <div className="beers-header">
            <h1 className="beers-title">Search Beers</h1>
          </div>
          <div className="beers-search">
            <form>
              <input
                placeholder="Search for..."
                ref={(input) => (this.search = input)}
                onChange={this.handleInputChange}
              />

              <button
                onClick={this.handleClick}
                className="btn btn-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>

            <div className="beers-container container">
              {this.state.getBeersInfo ? (
                <div className="beers-container container">
                  {this.state.beers.map((beer) => (
                    <div
                      key={beer.id}
                      // to={`/beer-info/${beer.id}`}
                      className="beers-link-item"
                    >
                      {' '}
                      {beer.name
                        .toLowerCase()
                        .includes(this.state.name.toLowerCase()) ? (
                        <div>
                          <Link to={`/beer/${beer.id}`}>
                            <h5 className="beers-name">{beer.name}</h5>
                          </Link>
                        </div>
                      ) : (
                        <p>not exists</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <h4>Nothing here, try another name</h4>
              )}
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
