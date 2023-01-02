const ejs = require("ejs");
const path = require("path");
const express = require("express");
const config = require('@Settings/config');

const getFilesSync = require("@Utils/fileWalk");

class App {
  constructor(client, locals = {}) {    
    this.express = express();
    
    this.express.set('views', 'views');
    this.express.engine("html", ejs.renderFile);
    this.express.set("view engine", "html");
    this.express.set('client', client);
    this.express.use('/static', express.static(path.join('public')))
    this.express.use('/images', express.static(path.join('images')))
    this.express.locals = locals;
    this
      .loadRoutes()
      .loadErrorHandler();
  }

  listen(port) {
    return new Promise((resolve) => this.express.listen(port, resolve));
  }

  
  loadRoutes() {
    const routesPath = path.join(__dirname, "./routes");
    const routes = getFilesSync(routesPath);

    if (!routes.length) return this;

    routes.forEach((filename) => {
      const route = require(path.join(routesPath, filename));
      
      const routePath = filename === "Router.js" ? "/" : `/${filename.slice(0, -3)}`;

      try {
        this.express.use(routePath, route);
      } catch (error) {
        client.logger.log(`Error occured with the route "${filename}"\n\n${error}`);
      }
    });

    return this;
  }

  
  loadErrorHandler() {
    this.express.use((error, _req, res, _next) => {
      const { message, statusCode = 500 } = error;
      if (statusCode >= 500) client.logger.log(error, 'error');

      res.status(statusCode).send({
        message,
        status: statusCode
      });
    });

    return this;
  }
}



module.exports = App;