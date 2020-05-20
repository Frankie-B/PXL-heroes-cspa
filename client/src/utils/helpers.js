import _ from 'lodash';

export const getCountryNames = (breweries) => {
  const locations = breweries
    .filter((brewery) => {
      return brewery.locations !== null && brewery.locations !== undefined;
    })
    .map((brewery) => {
      return brewery.locations;
    });
  const flatArr = _.flatten(locations);
  const countries = flatArr.map((location) => {
    return location.country.displayName;
  });
  const uniqueCountryNames = _.uniq(countries);
  return uniqueCountryNames;
};

export const filterCountries = () => {
  if (!countryName) {
    return breweries;
  }
  const filteredBreweries = breweries
    .filter((brewery) => {
      return brewery.locations !== null && brewery.locations !== undefined;
    })
    .filter((brewery) => {
      const locations = brewery.locations.filter((location) => {
        return location.country.displayName === countryName;
      });
      return locations.length > 0;
    });
  return filteredBreweries;
};

function filterBreweriesByName(breweries: Array<Brewery>, name: string) {
  const filteredBreweries = breweries.filter((brewery) => {
    const regex = new RegExp(name, 'i');
    console.log(brewery.name, name, regex.test(brewery.name));
    return regex.test(brewery.name);
  });
  return filteredBreweries;
}
