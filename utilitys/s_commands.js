const mongoose = require("mongoose");
const config = require("@Settings/config.js")
const { readdirSync } = require("fs");

function loadSlashCommands(client) {

    const slashCmds = [];

    readdirSync("./discord/commands/").forEach(async (dir) => {

        const slashCommandFile = readdirSync(`./discord/commands/${dir}`).filter((files) => files.endsWith('.js'));

        for (const file of slashCommandFile) {

            const slashCommand = require(`../discord/commands/${dir}/${file}`);

            if (!slashCommand.name) return console.error(`[GitHub Updates - Slash Commands] Error: ${slashCommand.split(".")[0]} Application Command Name is required!`);

            if (!slashCommand.description) return console.error(`[GitHub Updates - Slash Commands] Error: ${slashCommand.split(".")[0]} Application Command Description is required!`);

            client.slash.set(slashCommand.name, slashCommand);

            client.logger.log(`Loaded Slash Command: ${slashCommand.name} Successfully`, "cmd");

            slashCmds.push(slashCommand);
        }
    });
}

module.exports = loadSlashCommands;
