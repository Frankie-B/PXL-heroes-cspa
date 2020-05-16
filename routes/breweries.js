const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
  axios
    .get(
      `https://sandbox-api.brewerydb.com/v2/breweries?withLocations=Y&key=${process.env.API_KEY}&withLocations=Y`
    )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.json({ err }).status(500);
    });
});

app.get('/breweries/:id', function (req, res, next) {
  console.log('req.params', req);
  const selectedBrewery = req.params.id;
  axios
    .get(
      `https://sandbox-api.brewerydb.com/v2/brewery/${selectedBrewery}/beers?key=${process.env.API_KEY}`
    )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

// "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y"

module.exports = app;
