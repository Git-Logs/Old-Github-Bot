require("module-alias/register");
require('@Utils/Interactions');

const { Client, Message, MessageEmbed, Collection, Intents } = require('discord.js');
const { loadInteractions } = require('@Utils/loadInteractions');
const { loadAllBotCommands } = require('@Utils/commands');
const { loadAllBotEvents } = require('@Utils/events');
const loadSlashCommands = require('@Utils/s_commands');
const config = require('@Settings/config');
const mongo = require('mongoose')
const { readdirSync } = require('fs');

const client = new Client({
    shards: 'auto',
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES 
    ],
    allowedMentions: {
        parse: [ 'roles', 'users' ],
        repliedUser: true
    },
    partials: [ 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER' ]
});

module.exports = client;

client.logger = require('@Utils/logger');
client.config = require('@Settings/config');

client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

client.limits = new Map();

client.embedColor = '#CCFE00'
client.embedImage = 'https://cdn.discordapp.com/attachments/653733403841134600/913163329118281768/IMG_1409.png'
client.embedFooter = '© 2021 - 2022 GitHub Updates | Made By: Toxic Dev'

client.on('disconnect', () => { console.log('[GitHub Updates] - Client is Disconnecting from the Discord API!')});
client.on('reconnecting', () => { console.log('[GitHub Updates] - Client is Reconnecting to the Discord API, Please wait!')});
client.on('warn', error => { console.log(`[GitHub Updates] - Warning: \n Message: ${error} \n Stack: ${error.stack}`)});
client.on('error', error => { console.log(`[GitHub Updates] - Error: \n Message: ${error} \n Stack: ${error.stack}`)});

mongo.connection.on('connected', () => {client.logger.log('[GitHub Updates] - Connected to the Database Successfully with no Errors!')});
mongo.connection.on('err', () => { console.log(`[GitHub Updates] - Mongoose Connection Error:\n Stack: ${error.stack}`, 'error')});
mongo.connection.on('disconnected', () => { console.log('[GitHub Updates] - Mongoose has been Disconnected!')});

process.on('unhandledRejection', error => { console.log(`[GitHub Updates] - Unhandled_Rejection: \n Message: ${error} \n Stack: ${error.stack}`)});
process.on('uncaughtException', error => { console.log(`[GitHub Updates] - Uncaught_Exception: \n Message: ${error} \n Stack: ${error.stack}`)});

loadAllBotCommands(client);
loadAllBotEvents(client);
loadInteractions(client);
loadSlashCommands(client);

module.exports.init = async (token) => {

    client.userBaseDirectory = __dirname;

     await client.login(config.token);

    return client;

}