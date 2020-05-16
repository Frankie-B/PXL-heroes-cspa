require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: process.env.ORIGIN_CLIENT,
    credentials: true,
  })
);

const port = 5000;

app.use('/', require('./routes/index'));
app.use('/beers', require('./routes/beers'));
app.use('/breweries', require('./routes/breweries'));

app.listen(port, () => console.log(`Server running on port ${port}`));
