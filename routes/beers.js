const express = require('express');
const axios = require('axios');
const app = express();

const BeerAPI = `https://sandbox-api.brewerydb.com/v2/beers/?key=${process.env.API_KEY}`;

app.get('/', (req, res) => {
  axios
    .get(BeerAPI)
    .then((BeerAPI) => {
      let beerData = BeerAPI.data;
      res.json({ beers: beerData }).status(200);
    })
    .catch((err) => {
      console.log(`These aren't the beers you're looking for!: ${err}`);
      res.json({ err }).status(500);
    });
});

module.exports = app;
