'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const port = process.env.PORT || 8080;
const ipAddress = '94.139.247.246';

app.listen(port, ipAddress, function () {
    console.log(`Server listening at http://${ipAddress}:${port}`);
});

