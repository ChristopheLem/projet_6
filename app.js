const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./database/mongoose');

const sauceRouter = require('./routers/sauce');
const userRouter = require('./routers/user');

connectDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRouter);
app.use('/api/sauces', sauceRouter);

module.exports = app;