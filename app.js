require('dotenv').config();
const express = require('express');
var app = express();
const cors = require('cors');

const port = 5000;

// app.use('/proxy', proxy('https://sandbox-api.brewerydb.com/v2/beers/'));

// app.use('/proxy', proxy('http://localhost:3000'));

app.use(
  cors({
    origin: process.env.ORIGIN_CLIENT,
    credentials: true,
  })
);

app.use('/', require('./routes/index'));
app.use('/', require('./routes/beersApi'));

app.listen(port, () => console.log(`Server running on port ${port}`));
