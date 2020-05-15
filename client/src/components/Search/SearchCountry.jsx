import React from 'react';

class SearchByCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryValue: '',
    };
  }

  handleOnChange = (e) => {
    this.setState({
      countryValue: e.target.value,
    });
    this.props.handleSearch(e.target.value);
  };

  render() {
    return (
      <div>
        <input
          className="search-name"
          placeholder="Search Country"
          type="text"
          name="text"
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    );
  }
}

export default SearchByCountry;
