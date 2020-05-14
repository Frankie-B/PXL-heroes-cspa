const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Breweries is up an running' });
});

module.exports = app;
