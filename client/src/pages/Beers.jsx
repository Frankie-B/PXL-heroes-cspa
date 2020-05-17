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
      sortByCountry: false,
      sortByName: false,
    };
    this.getBeersInfo = this.getBeersInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sortByCountry = this.sortByCountry.bind(this);
    this.sortByName = this.sortByName.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.getBeersInfo();
  }

  getBeersInfo() {
    let url = '/beers';
    if (this.state.query) {
      url += '?';
      url += this.state.query;
    }
    axios({
      url: `${url}/?key=659d5c6b8f3d2447f090119e48202fdb&name`,
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
        if (this.state.query) {
          this.getBeersInfo();
        }
      }
    );
  }

  sortByCountry(e) {
    e.preventDefault();
    this.setState({
      sortByCountry: !this.state.sortByCountry,
    });
  }

  sortByName(e) {
    e.preventDefault();
    this.setState({
      sortByName: !this.state.sortByName,
    });
  }

  render() {
    return (
      <Default>
        <div className="Beers container">
          <div className="beers-header">
            <h1 className="beers-title">Search Beers</h1>
          </div>

          <div className="beers-search">
            <form className="beers-form form-inline my-2 my-lg-0">
              <input
                className="form-control "
                placeholder="Search Beer"
                ref={(input) => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <button
                // onClick={this.handleClick}
                className="btn btn-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>

            <div className="beers-filters">
              <div className="beers-filter form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sortByName"
                  value={this.state.sortByName}
                  onClick={this.sortByName}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Sort by name
                </label>
              </div>
              <div className="beers-filter form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sortCountry"
                  value={this.state.sortCountry}
                  onClick={this.sortCountry}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Sort by Country
                </label>
              </div>
            </div>

            <div className="container">
              {this.state.beers ? (
                <div className="beers-container container">
                  {this.state.beers.map((beer) => (
                    <div
                      key={beer.id}
                      // to={`/beer-info/${beer.id}`}
                      className="beers-link-item"
                    >
                      {beer.name
                        .toLowerCase()
                        .includes(this.state.query.toLowerCase()) ? (
                        <div>
                          <Link
                            to={`/beer/${beer.id}`}
                            className="beers-link-item"
                          >
                            <h5 className="beers-name">{beer.name}</h5>
                          </Link>
                        </div>
                      ) : (
                        <p className="beers-not-found">
                          That beer does not exists
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <h4 className="beers-error">
                  Whoops the fridge is empty, try another name
                </h4>
              )}
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Beers;
