// Ce programme attend des requêtes http et va y répondre
const http = require('http'); // On importe le package http de node
const app = require('./app'); // Permet d'exporter app.js

const normalizePort = val => { // Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
    const port = parseInt(val, 10);
  
    if (isNaN(port)) { // Si le port n'est pas un numéro (une chaîne de caractères)
      return val; // Retourner la valeur en paramètres
    }
    if (port >= 0) { // Si le port est supérieur ou égal à 0
      return port; // Retourner le port
    }
    return false; // Sinon retourner 0
};


const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port); // L'appli va tourner sur le port 3000

const errorHandler = error => { // Gestion des erreurs
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(process.env.PORT || 3000); // Le serveur doit toujours écouter un port soit celui du .env soit le 3000
