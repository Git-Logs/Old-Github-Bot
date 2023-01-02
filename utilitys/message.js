const REPOS = require('@Database/repos');
const { Client, MessageEmbed } = require('discord.js');
const logger = require('@Utils/logger');

async function sendMessages(client, repo, message, guildID) {

   const subs = await REPOS.findOne({ repo: repo });

   const channel = await client.channels.cache.find(c => c.id === sub.channel);

   if (channel) {

    if (guildID != null && channel.guild.id !== guildID) {

        logger.log(`Woah, Someone is trying to do something fishy with your Repos in the: ${channel.guild.name} server (ID: ${channel.guild.id})`);

        return;
    }

    let gitEmbed = new MessageEmbed()
      .setTitle('🎉 New GitHub Update!!')
      .setColor(client.embedColor)
      .setDescription(`${message}`)
      .setTimestamp()
      .setFooter('© 2021 - 2022 GitHub Updates', 'https://cdn.discordapp.com/attachments/653733403841134600/913163329118281768/IMG_1409.png')

    channel.send({ embeds: [gitEmbed]})
   } else {

    logger.log('Client does not have perms in this channel');
   }
}