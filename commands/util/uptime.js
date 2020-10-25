const { MessageEmbed } = require('discord.js');
const colors = require('../../colors');
const BaseCommand = require('../../src/base/baseCommand');

module.exports = class UptimeCommand extends BaseCommand {
  constructor(client) {
    super(client, {
      name: 'uptime',
      memberName: 'uptime',
      group: 'util',
      description: 'Shows how long the bot has been online for',
      clientPermissions: ['EMBED_LINKS'],
      throttling: {
        usages: 1,
        duration: 2,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async task(ctx) {
    const days = Math.floor(this.client.uptime / 86400000);
    const hours = Math.floor(this.client.uptime / 3600000) % 24;
    const minutes = Math.floor(this.client.uptime / 60000) % 60;
    const seconds = Math.floor(this.client.uptime / 1000) % 60;

    const embed = new MessageEmbed()
      .setTitle('Uptime')
      .setColor(colors.botc)
      .setDescription(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL());
    return ctx.embed(embed);
  }
};
