const { Schema, model } = require('mongoose');

module.exports = model('guilds', new Schema({
    guild: { type: 'String' },
    blacklisted: { type: 'Boolean', default: false }
}));