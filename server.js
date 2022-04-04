const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});