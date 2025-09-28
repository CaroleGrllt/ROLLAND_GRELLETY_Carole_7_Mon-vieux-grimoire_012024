// server.js
const http = require('http');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app');

const PORT = parseInt(process.env.PORT, 10) || 4000; // Render fournit PORT
const HOST = '0.0.0.0'; // explicite (ok local + Render)

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`API listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  }
  if (err.code === 'EACCES') {
    console.error(`Port ${PORT} requires elevated privileges.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

// Arrêt propre (utile sur plateformes PaaS)
const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref(); // force au bout de 10s
};

['SIGTERM', 'SIGINT'].forEach(sig => process.on(sig, () => shutdown(sig)));
process.on('uncaughtException', (err) => { console.error('Uncaught exception:', err); process.exit(1); });
process.on('unhandledRejection', (reason) => { console.error('Unhandled rejection:', reason); process.exit(1); });
