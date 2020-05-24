import React, { Component } from 'react';
import Default from '../Layouts/Default';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Beers.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});

class Beers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // type: '',
      beersByName: [],
    };
    this.getBeers = this.getBeers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getBeers();
  }

  handleInputChange(e) {
    let searchValue = e.target.value;
    this.setState({
      name: searchValue.toLowerCase(),
    });
  }

  getBeers() {
    axios({
      url: `/beers`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          beersByName: res.data.beers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Default>
        <div className="Beers">
          <div className="beers-heading">
            <h1 className="beers-title">All Beers</h1>
          </div>

          <div className="beers-search">
            <div className="form-inline my-2 my-lg-0">
              <input
                className="form-control form-control-lg mr-sm-2"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Search by name"
                aria-label="Search"
              />
            </div>

            {this.state.beersByName ? (
              <div className="beers-container container">
                {this.state.beersByName.map((beer) => (
                  <div key={beer.id} className="beers-link-item">
                    {beer.name
                      .toLowerCase()
                      .includes(this.state.name.toLowerCase()) ? (
                      <div>
                        <Link
                          to={`/beers/${beer.id}`}
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
      </Default>
    );
  }
}

export default Beers;
