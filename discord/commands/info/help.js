const { MessageEmbed, MessageButton, MessageActionRow, Message, Client } = require('discord.js');
const { readdirSync } = require('fs');
const createDiscordMenu = require('@Utils/c_menu');

module.exports = {
    name: 'help',
    category: 'Info',
    aliases: ['h'],
    description: 'Return a list of All Available Commands!',
    args: false,
    usage: 'ghu!help || ghu!help <commandName>',
    permission: [],
    ownerOnly: false,

    execute: async (message, args, client) => {

        let color = client.embedColor;

        let categories = [];

        let cots = [];

        if (!args[0]) { 

            let ignored = ["Owner"];

            const emo = {
                Git: "📈",
                Info: "ℹ️",
                Owner: "👑",
            }

            let ccate = [];

            readdirSync('./discord/commands/').forEach((dir) => {

                if (ignored.includes(dir.toLowerCase())) return;

                const commands = readdirSync(`./discord/commands/${dir}/`).filter((file) => file.endsWith('.js'));

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;

                let nome = dir.toUpperCase();

                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`ghu!help ${dir.toLowerCase()}\``,
                    inline: true
                }

                categories.push(cats);
                ccate.push(nome);
            });

            const embed = new MessageEmbed()
              .setTitle('GitHub Updates | Help Command')
              .setThumbnail(client.embedImage)
              .setDescription(`>>> My prefix is: \`ghu!\`\n Use the menu, or use \`ghu!help <Category>\` to view a list of commands based on their Category!`)
              .setColor(client.embedColor)
              .addFields(categories)
              .setTimestamp()
              .setFooter(client.embedFooter, client.embedImage)

              let menus = createDiscordMenu(ccate);

              return message.channel.send({embeds: [embed], components: menus.smenu}).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {

                    if (interaction.customId != menuID) return;

                    let { values } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync('./discord/commands/').forEach((dir) => {

                        if (dir.toLowerCase() !== value.toLowerCase()) return;

                        const commands = readdirSync(`./discord/commands/${dir}/`).filter((file) => file.endsWith('.js'));

                        const cmds = commands.map((command) => {

                            let file = require(`../../commands/${dir}/${command}`);

                            if (!file.name) return "No command name available!";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;

                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} -` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {

                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : 'No Description Provided!',
                                inline: true,
                            }
                            catts.push(dota);
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {

                        const coEmbed = new MessageEmbed()
                         .setAuthor(`${value.charAt(0).toUpperCase() + value.slice(1)} Commands!`, client.embedImage)
                         .setColor(color)
                         .setDescription(`Use \`ghu!help\` followed by a command name to get more information on a command.\nFor example: \`ghu!help sub\`.\n\n`)
                         .addFields(catts)
                         .setTimestamp()
                         .setFooter(client.embedFooter, client.embedImage)

                         await interaction.deferUpdate();

                         return interaction.message.edit({
                             embeds: [coEmbed],
                             components: menus.smenu
                         })
                    };
                };

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });

                collector.on("collect", select);
                collector.on("end", () => null);
              });

        } else {

            let catts = [];

            readdirSync('./discord/commands/').forEach((dir) => {

                if (dir.toLowerCase() !== args[0].toLowerCase()) return;

                const commands = readdirSync(`./discord/commands/${dir}/`).filter((file) => file.endsWith(".js"));

                const cmds = commands.map((command) => {

                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No Command Name Available!";

                    let name = file.name.replace(".js", "");

                    if (client.commands.get(name).hidden) return

                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : '';

                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {

                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In Progress!" : "api!" + co.cname}`,
                        value: co.des ? co.des : `No Description Provided!`,
                        inline: true,
                    }

                    catts.push(dota);
                });

                cots.push(dir.toLowerCase());
            });

            const command =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if (cots.includes(args[0].toLowerCase())) {

                const coEmbed2 = new MessageEmbed()
                 .setAuthor(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!`, client.embedImage)
                 .setColor(color)
                 .setDescription(`Use \`ghu!help\` followed by a command name to get more information on a command.\nFor example: \`ghu!help sub\`.\n\n`)
                 .addFields(catts)
                 .setTimestamp()
                 .setFooter('© 2021 - 2022 Infinity Bot List', client.embedImage)
                 
                 return message.channel.send({ embeds: [coEmbed2]});
            };

            if (!command) {

                const noCommand = new MessageEmbed()
                 .setAuthor('Error: Invalid_Command', client.embedImage)
                 .setColor(color)
                 .setDescription('Use `ghu!help` for a list of all My Commands!')
                 .addFields(catts)
                 .setTimestamp()
                 .setFooter(client.embedFooter, client.embedImage)

                 return await message.channel.send({
                     embeds: [noCommand],
                     allowedMentions: {
                         repliedUser: false
                     },
                 });
            }

            const embed = new MessageEmbed()
              .setAuthor('Command Information', client.embedImage)
              .setColor(color)
              .setThumbnail(client.embedImage)
              .setDescription(command.description ? command.description : "No description for this command.")
              .addField('Command:', command.name ? `\`${command.name}\`` : "No name for this command.", true)
              .addField('Aliases:', command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.", true)
              .addField('Usage:', command.usage ? `\`ghu!${command.name} ${command.usage}\`` : `\`ghu!${command.name}\``, true)
              .setTimestamp()
              .setFooter(client.embedFooter, client.embedImage)

              return await message.channel.send({ embeds: [embed]});
        }
    }
}