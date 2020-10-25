const BaseCommand = require('../../src/base/baseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Shows bot latency to the Discord server',
      group: 'util',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async task(ctx) {
    ctx.say('One moment...').then((m) => {
      m.edit(`Pong! \`${m.createdTimestamp - ctx.message.createdTimestamp}ms\``);
    });
  }
};
