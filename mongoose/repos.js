const { Schema, model } = require('mongoose');

module.exports = model('repos', new Schema({
    repo: { type: 'String' },
    channel: { type: 'String'}
}));