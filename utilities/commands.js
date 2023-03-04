const mongoose = require("mongoose");
const config = require("@Settings/config.js")
const { readdirSync } = require("fs");

function loadAllBotCommands(client) {
    readdirSync("./discord/commands/").forEach(dir => {

        const commandFiles = readdirSync(`./discord/commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (const file of commandFiles) {

            const command = require(`../discord/commands/${dir}/${file}`);

            client.logger.log(`Loading Command ${command.name} from category: ${command.category}`, "cmd");

            client.commands.set(command.name, command);
        }
    });
}

module.exports = {
    loadAllBotCommands
};