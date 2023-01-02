const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
   
   if (message.author.bot) return;

   if (!message.guild) return;

    let prefix = 'ghu!';
   
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {

      const embed = new MessageEmbed()
        .setAuthor('How, Can i help you!', client.embedImage)
        .setColor(client.embedColor)
        .setDescription('Hey there, My prefix is `ghu!` | Help Command: `ghu!help`')
        .setTimestamp()
        .setFooter(client.embedFooter, client.embedImage)

      message.channel.send({embeds: [embed]})
    };

   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    const embed = new MessageEmbed()
        .setAuthor('Internal Error Occured!')
        .setColor("RED")
        .setTimestamp()
        .setFooter(client.embedFooter, client.embedImage);

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any valid arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);

        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {

        embed.setDescription("You do not have Permission to use this Command!");

        return message.channel.send({embeds: [embed]});
    }

    if (command.ownerOnly && message.author.id !== `${client.config.owner}`) {

        embed.setDescription("Woah man, Only my Dev: <@510065483693817867> can use this command!");

        return message.channel.send({embeds: [embed]});
    }

    try {

        command.execute(message, args, client, prefix);

    } catch (error) {

        let logChannel = await client.guilds.cache.get(client.config.mainGuild).channels.cache.get(config.logChan);

        let logEmbed = new MessageEmbed()
         .setAuthor('Internal Error: Command_Raised_Exception', client.embedImage)
         .setColor("RED")
         .setDescription(`Stack: ${error}`)
         .setTimestamp()
         .setFooter(client.embedFooter, client.embedImage)

         await logChannel.send({embeds: [logEmbed]});

        client.logger.log(error, 'error');

        embed.setDescription("There was an error executing that command, My Dev Team has been notified.");

        return message.channel.send({embeds: [embed]});
    }
  }