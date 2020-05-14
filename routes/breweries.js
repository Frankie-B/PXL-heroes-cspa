const express = require('express');
const axios = require('axios');
const app = express();

const BreweryAPI =
  'https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y';

app.get('/breweries', (req, res) => {
  axios
    .get(BreweryAPI)
    .then((res) => {
      let breweryData = BreweryAPI.data;
      res.status(200).res.json({ beers: breweryData });
    })
    .catch((err) => {
      console.log(`Whoops looks like the keg is dry!: ${err}`);
      res.status(500).json({ err });
    });
});

// "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y"

module.exports = app;
