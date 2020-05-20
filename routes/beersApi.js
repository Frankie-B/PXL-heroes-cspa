let express = require('express');
let router = express.Router();
let Axios = require('axios');

const baseUrl = 'https://sandbox-api.brewerydb.com/v2';

router.get('/beers', (req, res) => {
  Axios.get(`${baseUrl}/beers?key${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/beer/:id', (req, res) => {
  const beerDetail = req.params.id;
  Axios.get(`${baseUrl}/beer/${beerDetail}/?key=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data.data);
      res.json({ beer: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/breweries', (req, res) => {
  Axios.get(
    `${baseUrl}/breweries?withLocations=Y&key=${process.env.API_KEY}&withLocations=Y`
  )
    .then((response) => {
      console.log(response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`This is not the beer you are looking for: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/breweries/:id/beers', (req, res) => {
  console.log('req.params', req);
  const breweryDetail = req.params.id;
  Axios.get(
    `${baseUrl}/brewery/${breweryDetail}/beers?key=${process.env.API_KEY}`
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
