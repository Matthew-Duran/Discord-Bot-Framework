/* eslint-disable class-methods-use-this */
const { ArgumentType } = require('discord.js-commando');

class GuildArgumentType extends ArgumentType {
  constructor(client) {
    super(client, 'guild');
  }

  validate(val, msg) {
    const matches = val.match(/^(?:<#)?([0-9]+)>?$/);
    if (matches) return msg.guild && msg.guild.id === matches[1];
    if (msg.guild.name === val) return true;
    if (msg.guild.name.toLowerCase().includes(val.toLowerCase())) return true;
    return false;
  }

  parse(val, msg) {
    const matches = val.match(/^(?:<#)?([0-9]+)>?$/);
    if (matches && msg.guild && msg.guild.id === matches[1]) return msg.guild || null;
    if (msg.guild.name === val) return msg.guild;
    if (msg.guild.name.toLowerCase().includes(val.toLowerCase())) return msg.guild;
    return null;
  }
}

module.exports = GuildArgumentType;
