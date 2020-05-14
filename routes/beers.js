const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Ron', lastName: 'Awesome' },
    { id: 3, firstName: 'Frankie', lastName: 'Dev' },
  ];

  res.json(customers);
});

module.exports = app;
