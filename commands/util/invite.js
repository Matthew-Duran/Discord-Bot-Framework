const { MessageEmbed } = require('discord.js');
const colors = require('../../colors');
const BaseCommand = require('../../src/base/baseCommand');

module.exports = class InviteCommand extends BaseCommand {
  constructor(client) {
    super(client, {
      name: 'invite',
      description: 'Shows bot latency to the Discord server',
      group: 'util',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async task(ctx) {
    const embed = new MessageEmbed()
      .setDescription('**[Invite me to your server](https://discord.com/oauth2/authorize?client_id=746188881317199912&scope=bot&permissions=8)**')
      .setColor(colors.botc);
    ctx.embed(embed);
  }
};
