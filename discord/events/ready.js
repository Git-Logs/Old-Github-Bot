const mongoose = require("mongoose");
const config = require('@Settings/config');
const { MessageEmbed } = require('discord.js');
const { loadInteractions } = require('@Utils/loadInteractions');

module.exports = async (client) => {

    client.logger.log(`${client.user.tag} is Online and Ready!`, 'ready');

    client.user.setActivity('GitHub Updates | ghu!help', { type: 'STREAMING', url: 'https://twitch.tv/monstercat' });

    await loadInteractions();

    await client.application.commands.set(client.slash);
}