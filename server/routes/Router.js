const config = require("@Settings/config");
const { Permissions, MessageEmbed } = require("discord.js");

const { Router } = require("express");
const route = Router();

function customHeaders( req, res, next ){
  res.setHeader( 'X-Powered-By', 'Infinity Bot List' );
  res.setHeader( 'Content-Type', 'application/json' );
  next()
}

route.use( customHeaders );

route.use('/', require('./main/home'));
route.use('/', require('./server/guild'));

module.exports = route;