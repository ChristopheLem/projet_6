const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./database/mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routers/user');

connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.use('/api/auth', userRouter);

module.exports = app;