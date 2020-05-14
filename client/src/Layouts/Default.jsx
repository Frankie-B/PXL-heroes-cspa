import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Default.scss';

class Default extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Default">
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Default;
