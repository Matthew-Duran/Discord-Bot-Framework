const { MessageEmbed } = require('discord.js');
const Colors = require('../../colors.js');
const BaseCommand = require('../../src/base/baseCommand.js');

module.exports = class Prefix extends BaseCommand {
  constructor(client) {
    super(client, {
      name: 'prefix',
      group: 'util',
      description: 'Get or set the prefix for this guild.',
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
      userPermissions: ['ADMINISTRATOR'],
      args: [
        {
          key: 'prefix',
          prompt: 'New prefix to set, if any.',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async task(ctx) {
    const currentPrefix = ctx.guildStorage.get('commandPrefix');
    if (!ctx.args.prefix) return ctx.embed({ description: `Command prefix for this guild is currently set to \`${currentPrefix}\``, color: Colors.botc });
    if (ctx.args.prefix.length > 16) return ctx.embed({ description: 'Prefix must be less than 16 characters long', color: Colors.failc });
    ctx.guild.commandPrefix = ctx.args.prefix;
    ctx.guildStorage.set('commandPrefix', ctx.args.prefix);
    const embed = new MessageEmbed()
      .setDescription(`Command prefix for this guild successfully set to \`${ctx.args.prefix}\``)
      .setColor(Colors.botc);
    return ctx.embed(embed);
  }
};
