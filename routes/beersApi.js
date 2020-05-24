let express = require('express');
let router = express.Router();
let Axios = require('axios');

const baseUrl = 'https://sandbox-api.brewerydb.com/v2';

router.get('/beers', (req, res) => {
  Axios.get(`${baseUrl}/beers/?withBreweries&key=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data.data);
      res.json({ beers: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems that the keg is dry!: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/beers/:id', (req, res) => {
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
  Axios.get(`${baseUrl}/breweries/?withLocations&key=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response.data.data);
      res.json({ breweries: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Aww snap! That location does not exist: ${err}`);
      res.json({ err }).status(500);
    });
});

router.get('/brewery/:id', (req, res) => {
  const breweryDetail = req.params.id;
  Axios.get(`${baseUrl}/brewery/${breweryDetail}=${process.env.API_KEY}`)
    .then((response) => {
      console.log(response);
      res.json({ brewery: response.data.data }).status(200);
    })
    .catch((err) => {
      console.log(`Whoops seems like we took a wrong turn!: ${err}`);
      res.json({ err }).status(500);
    });
});

module.exports = router;
