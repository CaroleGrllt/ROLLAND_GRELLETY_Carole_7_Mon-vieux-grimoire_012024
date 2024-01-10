const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user')
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://root:root@mon-vieux-grimoire.ccrkhxa.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(express.json());

// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue le 5 janvier 2023 !' }); 
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/books', bookRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;