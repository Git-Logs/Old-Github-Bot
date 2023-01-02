const { Router } = require("express");
const { parse } = require("path");
const { handleRequest } = require('@Utils/request');
const route = Router();

route.get("/", async (req, res) => {
  res.send(JSON.stringify({
    message: 'Woah, What are you looking for. This is just a useless API',
    error: true,
    fatal: false,
    auth: false,
  }))
});

route.post('/', handleRequest);

module.exports = route;