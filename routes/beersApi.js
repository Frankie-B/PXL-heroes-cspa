let express = require('express');
let router = express.Router();
let Axios = require('axios');

router.get('/beers', (req, res) => {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/beers?key=${process.env.API_KEY}`
  )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/beers/search', (req, res) => {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/search?key=${process.env.API_KEY}&p=${this.state.page}&type=beer&q=${this.state.type}`
  )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/beers/locations', (req, res) => {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/locations?key=${process.env.API_KEY}`
  )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/beer/:id', (req, res) => {
  console.log(req.params);
  const selectedBeer = req.params.id;
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/beer/${selectedBeer}/?withBreweries=Y&key=${process.env.API_KEY}`
  )
    .then((response) => {
      console.log('api response', response.data);
      res.json({ beer: response.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/breweries', (req, res) => {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/breweries?withLocations=Y&key=${process.env.API_KEY}&withLocations=Y`
  )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`This is not the beer you are looking for: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/breweries/:id', (req, res) => {
  console.log('req.params', req);
  const selectedBrewery = req.params.id;
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/brewery/${selectedBrewery}/beers?key=${process.env.API_KEY}`
  )
    .then((response) => {
      console.log('api response', response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`This is not the beer you are looking for: ${err}`);
      res.json({ err }).status(500);
    });
});

module.exports = router;

//brewery/:breweryId/locations
