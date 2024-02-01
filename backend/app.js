const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user')
const path = require('path');

const db_co = process.env.MONGODB_CO

mongoose.connect(`${db_co}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;