import React, { Component } from 'react';
import Default from '../Layouts/Default';
import './Beers.scss';
import Test from '../components/test';

class Beers extends Component {
  render() {
    return (
      <Default>
        {/* <div className="Beers">          
            <div className="beers-container">
              <div className="beers-heading-container">
                <h1 className="beers-heading">Im feeling thirsty</h1>
              </div>
              <div className="beers-container">
                <h2 className="beers-name">I am thirsty</h2>
              </div>
            </div>
          
        </div> */}
        <Test />
      </Default>
    );
  }
}

export default Beers;
