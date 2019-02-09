const mongoose = require('mongoose');
const debug = require('debug')('app:index');
// const dbDebugger = require('debug')('app:db');
// const config = require('config');
// const morgan = require('morgan');
// const helmet = require('helmet');
const Joi = require('joi');
// const logger = require('./middleware/logger');
const children = require('./routes/children');
const orphanage = require('./routes/orphanage');
const home = require('./routes/home');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/DharmaApu')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.err('Could not connect to MongoDB!'));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // if it's not set, we get undefined
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');

app.set('views', './views'); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
// app.use(helmet());
app.use('/api/children', children);
app.use('/api/orphanage', orphanage);
app.use('/', home);

// // Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// if (app.get('env') === 'development'){
//     app.use(morgan('tiny'));
//     debug('Morgan enabled!');
// }

// // Db work
// dbDebugger('Connected to the database!'); 

// app.use(logger);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log (`Listening on port ${port}..`));
