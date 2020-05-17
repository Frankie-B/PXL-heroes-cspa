let express = require('express');
let router = express.Router();
let Axios = require('axios');

router.get('/beers', function (req, res) {
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

router.get('/beer/:id', function (req, res) {
  console.log(req.params);
  const selectedBrewery = req.params.id;
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/beer/${selectedBrewery}/?key=${process.env.API_KEY}`
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

router.get('/breweries', function (req, res) {
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

router.get('/breweries/:id', function (req, res) {
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
