const chalk = require('chalk');
const moment = require('moment');

module.exports = class Logger {

    static log (content, type = "log") {

        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;

        switch (type) {

            case "log": { 
                return console.log(`[GitHub Updates] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgBlue(type.toUpperCase())} | Message: ${content}`);
            }

            case "warn": {
                return console.log(`[GitHub Updates - Warning] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgYellow(type.toUpperCase())} | Message: ${content}`);
            }

            case "error": {
                return console.log(`[GitHub Updates - Error] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgRed(type.toUpperCase())} | Message: ${content}`);
            }

            case "debug": {
                return console.log(`[GitHub Updates - Debug] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgGreen(type.toUpperCase())} | Message: ${content}`);
            }

            case "cmd": {
                return console.log(`[GitHub Updates - Cmd] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgWhite(type.toUpperCase())} | Message: ${content}`);
            }

            case "event": {
                return console.log(`[GitHub Updates - Event] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgWhite(type.toUpperCase())} | Message: ${content}`);
            }

            case "ready": {
                return console.log(`[GitHub Updates - Ready] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgBlueBright(type.toUpperCase())} | Message: ${content}`);
            }

            default: throw new TypeError('[GitHub Updates] Logger Type must be either warn, debug, log, ready, cmd or error');
        }
    }
};