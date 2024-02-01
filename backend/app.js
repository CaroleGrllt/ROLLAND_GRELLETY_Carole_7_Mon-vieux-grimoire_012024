const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user')
const path = require('path');

const db_username = process.env.MONGODB_USERNAME
const db_password = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://${db_username}:${db_password}@mon-vieux-grimoire.ccrkhxa.mongodb.net/?retryWrites=true&w=majority`,
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