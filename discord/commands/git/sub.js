const { MessageEmbed, Message, Client } = require('discord.js');
const GitHubRepositories_DB = require('@Database/repos');

module.exports = {
    name: 'sub',
    category: 'Git',
    aliases: ['subscribe'],
    description: 'Subscribe to Updates for a GitHub Repo in the current Channel.',
    args: true,
    usage: 'ghu!sub <Repo Link>',
    permissions: [],
    ownerOnly: false,

    execute: async (message, args, client) => {

        try {

        let repo = args.slice(0).join(' ');

        let FindRepo = await GitHubRepositories_DB.findOne({ repo: repo, channel: message.channel.id })

        let repoExists = new MessageEmbed()
          .setTitle('🚫 Error: Duplicate_GitHub_Repo')
          .setColor(client.embedColor)
          .setDescription('Woah, This channel is already subbed to updates from that Repo!')
          .addField('View Sub List', `ghu!list`, true)
          .setTimestamp()
          .setFooter(client.embedFooter, client.embedImage)

        if (FindRepo) return message.channel.send({embeds: [repoExists]})

        else {

           let newRepo = new GitHubRepositories_DB({
                repo: repo,
                channel: message.channel.id
            });

            newRepo.save();

            let subSuccess = new MessageEmbed()
             .setTitle('✔️ New Subscription!')
             .setColor(client.embedColor)
             .setDescription(`Added a new Subscription for: ${message.channel.name}!`)
             .addField('Subscription', `${newRepo.repo}`, true)
             .addField('Channel', `${newRepo.channel}`, true)
             .setTimestamp()
             .setFooter(client.embedFooter, client.embedImage)
             
             return message.channel.send({embeds: [subSuccess]});

        }
    } catch (err) {

        let errorEmbed = new MessageEmbed()
          .setTitle('🚫 Error: Internal Error')
          .setColor('RED')
          .setDescription('Woah, Something went wrong here! This error has been Sent to my Dev')
          .addField('Error', `${err}`, true)
          .setTimestamp()
          .setFooter(client.embedFooter, client.embedImage)

        client.logger.log(err, 'error');

        return message.channel.send({embeds: [errorEmbed]});
  }
 }
}