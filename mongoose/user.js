const { Schema, model } = require('mongoose');

module.exports = model('users', new Schema({
    user: { type: 'String' },
    blacklisted: { type: 'Boolean', default: false }
}));