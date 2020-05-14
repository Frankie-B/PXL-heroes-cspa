import React, { Component } from 'react';

class BeerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Beer-detail">
        <Link to={`/beers/${this.props.beer._id}`} className="card-link">
          <img
            className="card-img-top list-img"
            src={this.props.beers.data.labels.medium}
            alt="Card image cap"
          />
          <div className="card-body">
            <h3 className="card-title">{this.props.beer.name}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default BeerDetail;
