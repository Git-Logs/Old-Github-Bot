const sendMessages = require('./message');
const Events = require('@Git/events');

function handleRequest(req, res) {

    // @TODO Verify that this request came from GitHub

    const event = req.get("X-GitHub-Event");

    if (event) {

      const message = Events[event](req.body);

      const repo = req.body.repository.full_name.toLowerCase();

      sendMessages(repo, message, req.params.guildID);

      res.sendStatus(200);

    } else {

      res.sendStaus(400);

    }
}

module.exports = {
  handleRequest,
}