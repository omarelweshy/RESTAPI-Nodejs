const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('connot connect'));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}....`));