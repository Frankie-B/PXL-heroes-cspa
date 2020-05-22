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
      beers: [],
    };
    this.getAllBeers = this.getAllBeers.bind(this);
  }

  componentDidMount() {
    this.getAllBeers();
  }

  getAllBeers() {
    axios({
      url: `/beers`,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          beers: response.data.beers,
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
            <h1 className="beers-title">Here's a list of our beers</h1>
          </div>

          {this.state.beers ? (
            <div className="beers-container container">
              {this.state.beers.map((beer) => (
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
                    <p className="beers-not-found">That beer does not exists</p>
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
      </Default>
    );
  }
}

export default Beers;
