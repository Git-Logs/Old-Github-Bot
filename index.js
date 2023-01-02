require("module-alias/register");

const mongo = require("mongoose");
const config = require("@Settings/config");
const Bot = require('@Discord/index');
const Website = require('@Express/index');
const logger = require('@Utils/logger');

(async () => {

    const dbOptions = {
        family: 4,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
    }

    await mongo.connect(config.mongoose, dbOptions);

    mongo.promise = global.Promise;

    let client = await Bot.init(config.token);

    logger.log(`${client.user.tag} is Online and Ready!`, 'ready');

    await new Website(client).listen(config.port);

    logger.log(`Web Server is Online and Ready!`, 'ready');
})()