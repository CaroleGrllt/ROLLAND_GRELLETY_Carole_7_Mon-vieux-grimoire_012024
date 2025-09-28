// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

/** 1) CORS : autorise le dev local + GitHub Pages
 *  (L’origine Pages est le domaine, pas le chemin du repo)
 */
const allowedOrigins = [
  'http://localhost:3000',   // CRA dev
  'http://localhost:5173',   // Vite dev (au cas où)
  'https://carolegrllt.github.io'
];
// Permet d'ajouter d'autres origines via une variable d'env (optionnel)
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(
    ...process.env.CORS_ORIGIN.split(',').map(s => s.trim()).filter(Boolean)
  );
}
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Si tu utilises des cookies "secure", décommente la ligne suivante :
/* app.set('trust proxy', 1); */

app.use(express.json());

/** 2) Connexion MongoDB (Render/Atlas)
 *  - Utilise MONGODB_URI si dispo, sinon garde compat avec MONGODB_CO
 */
const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_CO;
if (!mongoUri) {
  console.error('❌ Variable MONGODB_URI (ou MONGODB_CO) manquante.');
  process.exit(1);
}

mongoose.connect(mongoUri /*, { dbName: 'mon_vieux_grimoire' } */)
  .then(() => console.log('✅ Connexion à MongoDB réussie'))
  .catch((err) => {
    console.error('❌ Connexion à MongoDB échouée :', err.message);
    process.exit(1);
  });

/** 3) Routes API */
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

/** 4) Fichiers statiques (images)
 *  ⚠️ Sur Render, le disque est éphémère : les uploads disparaissent
 *  au redéploiement si tu n’utilises pas un "Persistent Disk" ou un
 *  stockage externe (Cloudinary/S3).
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
