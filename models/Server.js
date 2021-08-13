const express = require('express');
const cors = require('cors');
const bddConnection = require('../database/config');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.routesConfig = {
      User: {
        path: '/api/user',
        router: require('../routes/user.routes'),
      },
      Auth: {
        path: '/api/auth',
        router: require('../routes/auth.routes'),
      },
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  async database() {
    await bddConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.routesConfig.User.path, this.routesConfig.User.router);
    this.app.use(this.routesConfig.Auth.path, this.routesConfig.Auth.router);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
