const express = require('express');
const axios = require('axios');
const app = express();

const BeerAPI =
  'https://sandbox-api.brewerydb.com/v2/beers/?key=659d5c6b8f3d2447f090119e48202fdb';

app.get('/', (req, res) => {
  axios
    .get(BeerAPI)
    .then((BeerAPI) => {
      let beerData = BeerAPI.data;
      res.status(200).json({ beers: beerData });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
