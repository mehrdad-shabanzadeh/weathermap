const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());


if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}


app.use('/api/v1/7030', require('./routes/weatherRouter'))

module.exports = app;
