const express = require('express');

const dotenv = require('dotenv');
const path = require('path');

const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const connectDB = require('./database/mongoose');

const sauceRouter = require('./routers/sauce');
const userRouter = require('./routers/user');

// Charge les variables environnement
dotenv.config({ path: './config/config.env' });

// Connect à la base de donnée
connectDB();

const app = express();

// Permet de reconnaitre les requêtes entrantes en tant que objet JSON
app.use(express.json());

// Permet CORS
app.use(cors());

// Désinfecte les données
app.use(mongoSanitize());

// Configure en-têtes HTTP
app.use(helmet());

// Empêche les attaques cross-site scripting (xss)
app.use(xss());

// Limite le nombre de requête
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Empêche la pollution des paramètres http
app.use(hpp());

// Gestion des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRouter);
app.use('/api/sauces', sauceRouter);

module.exports = app;