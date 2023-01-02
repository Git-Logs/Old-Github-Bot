const mongoose = require("mongoose");
const config = require("@Settings/config.js")
const { readdirSync } = require("fs");

function loadAllBotEvents(client) {
    readdirSync('./discord/events/').forEach(file => {

        const event = require(`../discord/events/${file}`);
    
        let eventName = file.split(".")[0];
    
        client.logger.log(`Loading Client Events: ${eventName}`, 'event');
    
        client.on(eventName, event.bind(null, client));
    });
}

module.exports = {
    loadAllBotEvents
}