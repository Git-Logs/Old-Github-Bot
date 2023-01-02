const { Router } = require("express");
const { parse } = require("path");
const { handleRequest } = require('@Utils/request');
const route = Router();

route.post('/:guildID', handleRequest);

module.exports = route;