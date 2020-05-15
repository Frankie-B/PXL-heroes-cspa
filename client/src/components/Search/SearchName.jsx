import React, { Component } from 'react';

class SearchName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
    };
  }

  handleOnChange = (e) => {
    this.setState({
      nameValue: e.target.value,
    });
    this.props.handleSearch(e.target.value);
  };

  render() {
    return (
      <div>
        <input
          className="search-name form-control mr-sm-2"
          placeholder="Brewery Name"
          type="text"
          name="text"
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    );
  }
}

export default SearchName;
